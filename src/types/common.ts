export interface ApiResponse<T> {
  documents: T[];
  total: number;
}

export interface ApiError {
  message: string;
  code: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SearchParams {
  query?: string;
  category?: string;
  sort?: string;
} 