export interface Teacher {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  mode: string;
  remark?: string;
  img?: string;
  content: string;
}

export interface TeacherFormData {
  name: string;
  age: number;
  gender: string;
  address: string;
  mode: string;
  remark?: string;
  img?: string;
}
