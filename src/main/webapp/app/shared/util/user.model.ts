export class BaseUserModel {
  id: string;
  is_active: boolean;
  created_at: string;
  username: string;

  constructor(input: any) {
    this.id = input.id ?? "";
    this.is_active = input.is_active ?? true;
    this.created_at = input.created_at ?? "";
    this.username = input.username ?? "";
  }
}
