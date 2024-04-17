import * as Yup from "yup";
export const addStudentValidation = Yup.object().shape({
    admission_no: Yup.string().required("Admission number is required"),
    student_name: Yup.string().required("Student name is required"),
    class_name: Yup.string().required("Class is required"),
    section: Yup.string().required("Section is required"),
    roll_no: Yup.string().required("Roll number is required"),
    father_name: Yup.string().required("Father's name is required"),
    mother_name: Yup.string().required("Mother's name is required"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    address: Yup.string().required("Address is required"),
    alternative_phone_no: Yup.string().required(
      "Alternative phone number is required"
    ),
    father_occupation: Yup.string().required("Father's occupation is required"),
    mother_occupation: Yup.string().required("Mother's occupation is required"),
    religion: Yup.string().required("Religion is required"),
    reserve_category: Yup.string().required("Category is required"),
    quota: Yup.string(),
    date_of_admission: Yup.date().required("Date of admission is required"),
    height: Yup.number(),
    weight: Yup.number(),
    blood_group: Yup.string(),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone: Yup.string().required("Phone number is required"),
    ews: Yup.string(),
    bpl: Yup.string()
  });
export const addStaffValidation = Yup.object().shape({
    staff_name: Yup.string().required("Student name is required"),
    role: Yup.string().required("Role is required"),
    address: Yup.string().required("Address is required"),
    gender: Yup.string().required("Gender is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone: Yup.string().required("Phone number is required"),
    religion: Yup.string().required("religion is required"),
    qualification: Yup.string().required("qualification is required"),
    experience: Yup.string().required("experience is required"),
    designation: Yup.string().required("designation is required"),
  });

  export const createFeesValidation = Yup.object().shape({
    student_id: Yup.string().required("student_id is required"),
  });


  export const createFeeStructureValidation = Yup.object().shape({
    class_value: Yup.string().required("class is required"),
    basic_fees: Yup.string().required("basic_fees is required"),
    due_date: Yup.string().required("due_date is required")
  });

  export const createSalaryValidation = Yup.object().shape({
    staff_id: Yup.string().required("staff id is required"),
    basic_salary: Yup.string().required("basic salary is required")
  });
  export const paySalaryValidation = Yup.object().shape({
    staff_id: Yup.string().required("staff id is required"),
    status: Yup.string().required("status is required")

  })
  export const bookValidation = Yup.object().shape({
    book_name: Yup.string().required("Book Name is required"),
    quantity: Yup.string().required("Quantity is required"),
    price: Yup.string().required("Price is required"),
    row_no: Yup.string().required("Row is required"),
    section: Yup.string().required("Section is required"),
    subject: Yup.string().required("Subject is required"),
    class_name: Yup.string().required("Class is required"),
  });
  export const issueBookValidation = Yup.object().shape({
    book_name: Yup.string().required("Book Name is required"),
    student_id: Yup.string().required("Addmission is required"),
    issue_date: Yup.string().required("Issue Date is required"),
    return_date: Yup.string().required("Return Date is required"),
    price: Yup.string().required("Price is required"),
    day: Yup.string().required("Day is required"),
  });