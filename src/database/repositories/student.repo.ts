import APIError from "src/errors/api-error";
import { AppDataSource } from "..";
import { Student } from "../models/student.model";
import { IStudent, QueryParams } from "./@types/student.type";
import { StatusCode } from "src/utils/const/status-code";
import { logger } from "src/utils/logger";

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
  async findStudentByQuery(queryParam: QueryParams) {
    try {
      const { query } = queryParam;
      if (!query) {
        throw new APIError(
          "Query parameter is required",
          StatusCode.BadRequest
        );
      }

      const patterns = {
        english: /^[a-zA-Z]+$/,
        khmer: /^[\u1780-\u17FF]+$/,
      };

      let searchField: string;
      let searchValue: string;

      if (patterns.english.test(query)) {
        searchField = "firstName";
        searchValue = `%${query}%`;
      } else if (patterns.khmer.test(query)) {
        searchField = "lastName"; // Adjust based on your Khmer name field
        searchValue = `%${query}%`;
      } else {
        throw new APIError(
          "Query does not match any valid pattern",
          StatusCode.BadRequest
        );
      }

      const studentRepo = this.appData.getRepository(Student);

      const students = await studentRepo
        .createQueryBuilder("student")
        .where(`student.${searchField} ILIKE :query`, { query: searchValue })
        .andWhere("student.isDeleted = false")
        .getMany();

      if (!students.length) {
        throw new APIError(
          "No students found matching the query",
          StatusCode.NotFound
        );
      }

      return students;
    } catch (error) {
      logger.error(`An error occurred in findStudentByQuery(): ${error}`);
      throw error;
    }
  }
  async getAllStudents() {
    try {
      const createStudentRepo = this.appData.getRepository(Student);
      const students = await createStudentRepo.find({
        where: { isDeleted: false },
      });
      return students;
    } catch (error) {
      throw error;
    }
  }
  async getStudentById(id: number) {
    try {
      const createStudentRepo = this.appData.getRepository(Student);
      const student = await createStudentRepo.findOne({
        where: { id, isDeleted: false },
      });
      return student;
    } catch (error) {
      throw error;
    }
  }
  async updateStudent(id: number, std: IStudent) {
    try {
      const studentRepo = this.appData.getRepository(Student);
      const updatedStudent = await studentRepo.findOne({
        where: { id, isDeleted: false },
      });
      if (!updatedStudent) {
        throw new APIError("Student does not exist", StatusCode.NoContent);
      }
      await studentRepo.update(id, std);
      return updatedStudent;
    } catch (error) {
      throw error;
    }
  }
  async deleteStudent(id: number) {
    try {
      const createStudentRepo = this.appData.getRepository(Student);
      return await createStudentRepo.update(id, { isDeleted: true });
    } catch (error) {
      throw error;
    }
  }
}
