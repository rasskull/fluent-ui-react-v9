import axios from 'axios'

export interface FigmaFile {
  key: string
  name: string
  thumbnail_url: string
  last_modified: string
}

export interface FigmaNode {
  id: string
  name: string
  type: string
  children?: FigmaNode[]
}

export interface FigmaFileResponse {
  name: string
  lastModified: string
  thumbnailUrl: string
  version: string
  document: FigmaNode
  components: Record<string, any>
  componentSets: Record<string, any>
  schemaVersion: number
  styles: Record<string, any>
  mainFileKey?: string
  branches?: any[]
}

class FigmaAPI {
  private baseURL = 'https://api.figma.com/v1'
  private token: string | null = null

  setToken(token: string) {
    this.token = token
    localStorage.setItem('figma_token', token)
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('figma_token')
    }
    return this.token
  }

  clearToken() {
    this.token = null
    localStorage.removeItem('figma_token')
  }

  private getHeaders() {
    if (!this.token) {
      throw new Error('Figma access token not set. Please authenticate first.')
    }
    return {
      'X-Figma-Token': this.token,
      'Content-Type': 'application/json'
    }
  }

  async getUserProfile() {
    const response = await axios.get(`${this.baseURL}/me`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async getFile(fileKey: string): Promise<FigmaFileResponse> {
    const response = await axios.get(`${this.baseURL}/files/${fileKey}`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async getFileNodes(fileKey: string, nodeIds: string[]): Promise<any> {
    const ids = nodeIds.join(',')
    const response = await axios.get(`${this.baseURL}/files/${fileKey}/nodes?ids=${ids}`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async getTeamProjects(teamId: string) {
    const response = await axios.get(`${this.baseURL}/teams/${teamId}/projects`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async getProjectFiles(projectId: string) {
    const response = await axios.get(`${this.baseURL}/projects/${projectId}/files`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async createComment(fileKey: string, message: string, x?: number, y?: number) {
    const response = await axios.post(`${this.baseURL}/files/${fileKey}/comments`, {
      message,
      client_meta: x && y ? { x, y } : undefined
    }, {
      headers: this.getHeaders()
    })
    return response.data
  }

  async getComments(fileKey: string) {
    const response = await axios.get(`${this.baseURL}/files/${fileKey}/comments`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  // Helper method to extract design tokens from Figma file
  extractDesignTokens(fileData: FigmaFileResponse) {
    const tokens: any = {
      colors: {},
      typography: {},
      spacing: {},
      components: {}
    }

    // Extract colors from styles
    Object.entries(fileData.styles).forEach(([key, style]: [string, any]) => {
      if (style.style_type === 'FILL') {
        tokens.colors[key] = style
      } else if (style.style_type === 'TEXT') {
        tokens.typography[key] = style
      }
    })

    return tokens
  }

  // Helper method to flatten component structure
  flattenComponents(node: FigmaNode, components: any[] = []) {
    if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
      components.push(node)
    }

    if (node.children) {
      node.children.forEach(child => this.flattenComponents(child, components))
    }

    return components
  }
  // Helper method to list files accessible to the user
  async getTeamFiles(teamId: string) {
    const response = await axios.get(`${this.baseURL}/teams/${teamId}/files`, {
      headers: this.getHeaders()
    })
    return response.data
  }

  // Get all teams accessible to the user
  async getTeams() {
    const response = await axios.get(`${this.baseURL}/teams`, {
      headers: this.getHeaders()
    })
    return response.data
  }
}

export const figmaAPI = new FigmaAPI()