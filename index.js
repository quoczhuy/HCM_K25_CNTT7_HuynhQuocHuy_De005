let employees = [
  {
    employeeCode: "EMP-001",
    fullName: "Ngô Thanh Tùng",
    department: "Phòng Kỹ Thuật",
    age: 28,
    experienceYears: 5,
  },
  {
    employeeCode: "EMP-002",
    fullName: "Hồ Thị Thu",
    department: "Phòng Nhân Sự",
    age: 35,
    experienceYears: 10,
  },
  {
    employeeCode: "EMP-003",
    fullName: "Mai Quốc Việt",
    department: "Phòng Kỹ Thuật",
    age: 24,
    experienceYears: 1,
  },
];

let normalizeText = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    return "";
  }
  let trimmed = rawText.trim().replace(/\s+/g, " ");
  if (trimmed === "") {
    return "";
  }
  let words = trimmed.split(" ");
  let normalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return normalizedWords.join(" ");
};

let validateEmployeeCode = (code) => {
  if (code === null) {
    return "Hủy thao tác";
  }
  if (code === undefined || code.trim() === "") {
    return "Lỗi: Chưa nhập mã nhân viên";
  }
  let cleanedCode = code.trim();
  if (/\s/.test(cleanedCode)) {
    return "Lỗi: Chứa khoảng trắng";
  }
  if (cleanedCode.length < 6) {
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }
  let upperCode = cleanedCode.toUpperCase();
  if (!upperCode.startsWith("EMP-")) {
    return 'Lỗi: Sai tiền tố "EMP-"';
  }
  let index = findEmployeeIndex(upperCode);
  if (index !== -1) {
    return "Lỗi: Mã nhân viên đã tồn tại";
  }
  return "";
};

let findEmployeeIndex = (code) => {
  if (!code) {
    return -1;
  }
  let targetCode = code.trim().toUpperCase();
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].employeeCode.toUpperCase() === targetCode) {
      return i;
    }
  }
  return -1;
};

let inputIntegerInRange = (message, min, max) => {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    let trimmed = input.trim();
    if (trimmed === "") {
      alert("Lỗi: Chưa nhập, nhập lại");
      continue;
    }
    if (isNaN(trimmed)) {
      alert("Lỗi: Không phải số nguyên, nhập lại");
      continue;
    }
    let number = Number(trimmed);
    if (!Number.isInteger(number)) {
      alert("Lỗi: Không phải số nguyên, nhập lại");
      continue;
    }
    if (number < min || number > max) {
      alert(`Lỗi: Ngoài phạm vi ${min} - ${max}, nhập lại`);
      continue;
    }
    return number;
  }
};


let displayEmployees = (list) => {
  if (!list || list.length === 0) {
    console.log("Danh sách nhân viên trống");
    return;
  }
  for (let i = 0; i < list.length; i++) {
    let emp = list[i];
    console.log(
      `${i + 1}. ${emp.employeeCode} - ${emp.fullName} - ${emp.department}\nTuổi: ${emp.age} | Số năm kinh nghiệm: ${emp.experienceYears}`,
    );
  }
  console.log(`Tổng: ${list.length} nhân viên`);
};

let showEmployees = () => {
  if (employees.length === 0) {
    console.log("Danh sách nhân viên trống");
    return;
  }
  let sortChoice = prompt(
    "Chọn cách hiển thị:\n1. Theo thứ tự hiện tại\n2. Sắp xếp theo số năm kinh nghiệm tăng dần",
  );
  if (sortChoice === null) {
    return;
  }
  if (sortChoice.trim() === "2") {
    let sortedList = [...employees].sort(
      (a, b) => a.experienceYears - b.experienceYears,
    );
    displayEmployees(sortedList);
  } else {
    displayEmployees(employees);
  }
};

let addNewEmployee = () => {
  let codeInput = prompt("Nhập mã nhân viên (ví dụ: EMP-004):");
  if (codeInput === null) {
    console.log("Hủy thao tác thêm");
    return;
  }
  let validationError = validateEmployeeCode(codeInput);
  if (validationError !== "") {
    console.log(validationError);
    return;
  }
  let employeeCode = codeInput.trim().toUpperCase();

  let nameInput = prompt("Nhập họ tên nhân viên:");
  if (nameInput === null) {
    console.log("Hủy thao tác thêm");
    return;
  }
  let fullName = normalizeText(nameInput);
  while (fullName === "") {
    let retryName = prompt("Họ tên không được để trống. Nhập lại họ tên:");
    if (retryName === null) {
      console.log("Hủy thao tác thêm");
      return;
    }
    fullName = normalizeText(retryName);
  }

  let deptInput = prompt("Nhập phòng ban:");
  if (deptInput === null) {
    console.log("Hủy thao tác thêm");
    return;
  }
  let department = normalizeText(deptInput);
  while (department === "") {
    let retryDept = prompt(
      "Phòng ban không được để trống. Nhập lại phòng ban:",
    );
    if (retryDept === null) {
      console.log("Hủy thao tác thêm");
      return;
    }
    department = normalizeText(retryDept);
  }

  let age = inputIntegerInRange("Nhập tuổi (từ 18 đến 60):", 18, 60);
  if (age === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  let experienceYears = inputIntegerInRange(
    "Nhập số năm kinh nghiệm (từ 0 đến 40):",
    0,
    40,
  );
  if (experienceYears === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  let newEmp = {
    employeeCode: employeeCode,
    fullName: fullName,
    department: department,
    age: age,
    experienceYears: experienceYears,
  };

  employees.push(newEmp);
  console.log("Thêm nhân viên thành công:");
  console.log(
    `${newEmp.employeeCode} - ${newEmp.fullName} - ${newEmp.department} | Tuổi: ${newEmp.age} | Kinh nghiệm: ${newEmp.experienceYears}`,
  );
};

let updateEmployee = () => {
  let codeInput = prompt("Nhập mã nhân viên cần cập nhật:");
  if (codeInput === null) {
    return;
  }
  let index = findEmployeeIndex(codeInput);
  if (index === -1) {
    console.log(
      `Không tìm thấy nhân viên có mã [${codeInput.trim().toUpperCase()}]`,
    );
    return;
  }

  let emp = employees[index];
  let oldAge = emp.age;
  let oldExp = emp.experienceYears;

  console.log(
    `Thông tin trước khi cập nhật - Tuổi: ${oldAge} | Kinh nghiệm: ${oldExp}`,
  );

  let newAge = inputIntegerInRange("Nhập tuổi mới (từ 18 đến 60):", 18, 60);
  if (newAge === null) {
    console.log("Bấm Cancel – đã hủy cập nhật");
    return;
  }

  let newExp = inputIntegerInRange(
    "Nhập số năm kinh nghiệm mới (từ 0 đến 40):",
    0,
    40,
  );
  if (newExp === null) {
    console.log("Bấm Cancel – đã hủy cập nhật");
    return;
  }

  emp.age = newAge;
  emp.experienceYears = newExp;

  console.log("Cập nhật thành công");
  console.log(
    `Trước/Sau cập nhật - Tuổi: ${oldAge}/${emp.age} | Kinh nghiệm: ${oldExp}/${emp.experienceYears}`,
  );
};

let deleteEmployee = () => {
  let codeInput = prompt("Nhập mã nhân viên cần xóa:");
  if (codeInput === null) {
    return;
  }
  let index = findEmployeeIndex(codeInput);
  if (index === -1) {
    console.log(
      `Không tìm thấy nhân viên có mã ${codeInput.trim().toUpperCase()}`,
    );
    return;
  }

  let confirmDelete = prompt(
    `Bạn có chắc chắn muốn xóa nhân viên ${employees[index].employeeCode} không? (Y/N):`,
  );
  if (confirmDelete === null || confirmDelete.trim().toLowerCase() !== "y") {
    console.log(`Đã hủy thao tác xóa, còn ${employees.length} nhân viên`);
    return;
  }

  employees.splice(index, 1);
  console.log(`Xóa thành công, còn ${employees.length} nhân viên`);
};

let searchEmployeesByDepartment = () => {
  let keywordInput = prompt("Nhập từ khóa tên phòng ban cần tìm:");
  if (keywordInput === null) {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }
  let keyword = keywordInput.trim();
  if (keyword === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  let results = [];
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].department.toLowerCase().includes(keyword.toLowerCase())) {
      results.push(employees[i]);
    }
  }

  if (results.length === 0) {
    console.log("Không tìm thấy nhân viên phù hợp");
  } else {
    console.log(`Tìm thấy ${results.length} kết quả:`);
    displayEmployees(results);
  }
};

let showExitReport = () => {
  console.log("==================================================");
  console.log("BÁO CÁO TỔNG KẾT NHÂN VIÊN");
  console.log("==================================================");
  if (employees.length === 0) {
    console.log("Chưa có nhân viên nào");
    console.log("==================================================");
    console.log("Cảm ơn bạn đã sử dụng hệ thống. Tạm biệt!");
    return;
  }

  let totalEmployees = employees.length;
  let totalExp = 0;
  let maxExpEmp = employees[0];

  for (let i = 0; i < employees.length; i++) {
    totalExp += employees[i].experienceYears;
    if (employees[i].experienceYears > maxExpEmp.experienceYears) {
      maxExpEmp = employees[i];
    }
  }

  let avgExp = (totalExp / totalEmployees).toFixed(1);

  console.log(`Tổng số nhân viên                : ${totalEmployees}`);
  console.log(`Số năm kinh nghiệm trung bình    : ${avgExp}`);
  console.log(
    `Kinh nghiệm nhiều nhất           : ${maxExpEmp.employeeCode} - ${maxExpEmp.fullName} - ${maxExpEmp.experienceYears}`,
  );
  console.log("==================================================");
  console.log("Cảm ơn bạn đã sử dụng hệ thống. Tạm biệt!");
};

let runProgram = () => {
  let running = true;
  while (running) {
    let menu =
      "==========================================\n" +
      "HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY SKYTECH\n" +
      "==========================================\n" +
      "1.Hiển thị danh sách nhân viên\n" +
      "2. Thêm nhân viên mới\n" +
      "3. Cập nhật thông tin nhân viên\n" +
      "4. Xóa nhân viên\n" +
      "5. Tìm kiếm nhân viên theo phòng ban\n" +
      "0. Thoát chương trình\n" +
      "==========================================\n" +
      "Vui lòng nhập lựa chọn của bạn(0-5)"

    let choiceInput = prompt(menu);

    if (choiceInput === null) {
      alert("Lựa chọn không hợp lệ. Vui lòng thử lại.");
      continue;
    }

    let choice = choiceInput.trim();

    switch (choice) {
      case "1":
        showEmployees();
        break;
      case "2":
        addNewEmployee();
        break;
      case "3":
        updateEmployee();
        break;
      case "4":
        deleteEmployee();
        break;
      case "5":
        searchEmployeesByDepartment();
        break;
      case "0":
        showExitReport();
        running = false;
        break;
      default:
        alert("Lựa chọn không hợp lệ. Vui lòng thử lại từ 0 đến 5.");
        break;
    }
  }
};

runProgram();
