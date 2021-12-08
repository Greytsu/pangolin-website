export interface User{
  _id?: String,
  login: String,
  password?: String,
  name: String,
  role: String,
  friends: String[],
  date?: Date
}
