BÀI TẬP VỀ NHÀ 01:
TẠO SOLUTION GỒM CÁC PROJECT SAU:
 
  
  1, DLL đa năng, keyword: c# window library -> Class Library (.NET Framework) bắt buộc sử dụng .NET Framework 2.0: giải bài toán bất kỳ, độc lạ càng tốt, phải có dấu ấn cá nhân trong kết quả, biên dịch ra DLL. DLL độc lập vì nó ko nhập, ko xuất, nó nhận input truyền vào thuộc tính của nó, và trả về dữ liệu thông qua thuộc tính khác, hoặc thông qua giá trị trả về của hàm. Nó độc lập thì sẽ sử dụng được trên app dạng console (giao diện dòng lệnh - đen sì),
 cũng sử dụng được trên app desktop (dạng cửa sổ), và cũng sử dụng được trên web form (web chạy qua iis).
 
  2, Console app, bắt buộc sử dụng .NET Framework 2.0, sử dụng được DLL trên: nhập được input, gọi DLL, hiển thị kết quả, phải có dấu án cá nhân. keyword: c# window Console => Console App (.NET Framework), biên dịch ra EXE
  
  3, Windows Form Application, bắt buộc sử dụng .NET Framework 2.0**, sử dụng được DLL đa năng trên, kéo các control vào để có thể lấy đc input, gọi DLL truyền input để lấy đc kq, hiển thị kq ra window form,
phải có dấu án cá nhân; keyword: c# window Desktop => Windows Form Application (.NET Framework), biên dịch ra EXE

  4, Web đơn giản, bắt buộc sử dụng .NET Framework 2.0, sử dụng web server là IIS, dùng file hosts để tự tạo domain, gắn domain này vào iis, file index.html có sử dụng html css js để xây dựng giao diện nhập được các input cho bài toán, dùng mã js để tiền xử lý dữ liệu, js để gửi lên backend. backend là api.aspx, trong code của api.aspx.cs thì lấy được các input mà js gửi lên, rồi sử dụng được DLL đa năng trên. kết quả gửi lại json cho client, js phía client sẽ nhận được json này hậu xử lý để thay đổi giao diện theo dữ liệu nhận dược, phải có dấu án cá nhân. keyword: c# window web => ASP.NET Web Application (.NET Framework) + tham khảo link chatgpt thầy gửi. project web này biên dịch ra DLL, phải kết hợp với IIS mới chạy được.



BÀI LÀM :
 *) DLL đa năng 
- Mở Visual Studio → File → New → Project.
- Chọn loại: Class Library (.NET Framework) → đặt tên MyLib.
- Chọn đường dẫn lưu → Create.
- Nhấn Ctrl + Shift + B hoặc vào menu Build → Build Solution.
Visual Studio sẽ sinh ra file MyLib.dll trong thư mục:
...\MyLib\bin\Debug\MyLib.dll.
Mặc định sẽ có file Class1.cs, đổi tên thành MultiplicationTable.cs.

<img width="1920" height="1020" alt="Screenshot 2025-09-17 154806" src="https://github.com/user-attachments/assets/e691436f-9ae7-40c5-b41c-2bc8899ce2d0" />

*) Console App sử dụng DLL

Bước 1: Tạo Project Console
File → New → Project.
Chọn Console App (.NET Framework), đặt tên AppConsole.

Bước 2: Thêm tham chiếu đến DLL
Trong Solution Explorer → chuột phải vào References → Add Reference.
Chọn Projects → tick vào MyLib (hoặc Browse đến file MyLib.dll).

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/34fc2cb8-939e-41c6-8e69-ade2cb16b95f" />

Chạy ->nhập số -> in bảng cửu chương
<img width="1920" height="1022" alt="image" src="https://github.com/user-attachments/assets/359768e2-de54-44cd-a53c-12107d203ac5" />

*)Windows Form sử dụng DLL

Bước 1: Tạo Project WinForm
File → New → Project.
Chọn Windows Forms App (.NET Framework) → đặt tên AppWinForm.

Bước 2: Thêm DLL
Giống bước trên: chuột phải References → Add Reference → chọn MyLib.

Bước 3: Thiết kế Form
Thêm TextBox (Name = txtInput).
Thêm Button (Name = btnGenerate, Text = “Sinh bảng”).
Thêm ListBox (Name = lstResult).
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/e83e3ba3-0e22-4d38-a59b-84c9f309f39d" />
 Viết code kiểm tra 
 <img width="1920" height="1020" alt="Screenshot 2025-09-28 200859" src="https://github.com/user-attachments/assets/852d5a39-a607-4237-93fb-09cb0548c9c6" />

 <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/32f003aa-9da9-40a3-83ce-1935eb7d93c3" />

<img width="1920" height="1020" alt="Screenshot 2025-09-28 200816" src="https://github.com/user-attachments/assets/c73f9dd7-7cf0-4322-a076-7b5e00d9220d" />

*)Web App sử dụng DLL

Bước 1: Tạo Project Web Forms
File → New → Project.
Chọn ASP.NET Web Application (.NET Framework) → đặt tên AppWeb.
Chọn template Empty + tick Web Forms.

Bước 2: Thêm DLL
Chuột phải References → Add Reference → chọn MyLib.

Bước 3: Tạo file API
Chuột phải AppWeb → Add → Web Form → đặt tên api.aspx.
Trong api.aspx để nội dung rỗng:
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="api.aspx.cs" Inherits="AppWeb.api" %>



