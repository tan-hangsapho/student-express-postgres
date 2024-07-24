import { IStudent } from "src/database/repositories/@types/student.type";
import { StudentRepository } from "src/database/repositories/student.repo";

export class StudentService {
  private studentRepo: StudentRepository;
  constructor() {
    this.studentRepo = new StudentRepository();
  }
  async createStudent(std: IStudent) {
    try {
      return await this.studentRepo.createStudent(std);
    } catch (error) {
      throw error;
    }
  }
}
