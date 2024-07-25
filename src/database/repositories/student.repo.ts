import { AppDataSource } from "..";
import { Student } from "../models/student.model";
import { IStudent } from "./@types/student.type";

export class StudentRepository {
  private appData: typeof AppDataSource;
  constructor() {
    this.appData = AppDataSource;
  }
  async createStudent(std: IStudent) {
    try {
      const createStudentRepo = this.appData.getRepository(Student);
      const newStd = createStudentRepo.create(std);
      await createStudentRepo.save(newStd);
      return newStd;
    } catch (error) {
      throw error;
    }
  }
  async getAllStudents() {
    try {
      const createStudentRepo = this.appData.getRepository(Student);
      const students = await createStudentRepo.find();
      return students;
    } catch (error) {
      throw error;
    }
  }
  async getStudentById(id: number) {
    try {
      const createStudentRepo = this.appData.getRepository(Student);
      const student = await createStudentRepo.findOne({ where: { id } });
      return student;
    } catch (error) {
      throw error;
    }
  }
  async updateStudent(id: number, std: IStudent) {
    try {
      const createStudentRepo = this.appData.getRepository(Student);
      const updatedStudent = await createStudentRepo.update(id, std);
      return updatedStudent;
    } catch (error) {
      throw error;
    }
  }
  async deleteStudent(id: number) {
    try {
      const createStudentRepo = this.appData.getRepository(Student);
      await createStudentRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
