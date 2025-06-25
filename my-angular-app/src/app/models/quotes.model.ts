export interface Quote {
    id?: number;    
    text: string;
    author: string;
    userId?: number;  // no need to send this from frontend
    user?: any;      // optional navigation property, can be ignored
  }
  