Bài tập 02: Lập trình web.
==============================
NGÀY GIAO: 19/10/2025
==============================
DEADLINE: 26/10/2025
==============================
1. Sử dụng github để ghi lại quá trình làm, tạo repo mới, để truy cập public, edit file `readme.md`:
   chụp ảnh màn hình (CTRL+Prtsc) lúc đang làm, paste vào file `readme.md`, thêm mô tả cho ảnh.
2. NỘI DUNG BÀI TẬP:
2.1. Cài đặt Apache web server:
- Vô hiệu hoá IIS: nếu iis đang chạy thì mở cmd quyền admin để chạy lệnh: iisreset /stop
- Download apache server, giải nén ra ổ D, cấu hình các file:
  + D:\Apache24\conf\httpd.conf
  + D:Apache24\conf\extra\httpd-vhosts.conf
  để tạo website với domain: fullname.com
  code web sẽ đặt tại thư mục: `D:\Apache24\fullname` (fullname ko dấu, liền nhau)
- sử dụng file `c:\WINDOWS\SYSTEM32\Drivers\etc\hosts` để fake ip 127.0.0.1 cho domain này
  ví dụ sv tên là: `Đỗ Duy Cốp` thì tạo website với domain là fullname ko dấu, liền nhau: `doduycop.com`
- thao tác dòng lệnh trên file `D:\Apache24\bin\httpd.exe` với các tham số `-k install` và `-k start` để cài đặt và khởi động web server apache.
2.2. Cài đặt nodejs và nodered => Dùng làm backend:
- Cài đặt nodejs:
  + download file `https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi`  (đây ko phải bản mới nhất, nhưng ổn định)
  + cài đặt vào thư mục `D:\nodejs`
- Cài đặt nodered:
  + chạy cmd, vào thư mục `D:\nodejs`, chạy lệnh `npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"`
  + download file: https://nssm.cc/release/nssm-2.24.zip
    giải nén được file nssm.exe
    copy nssm.exe vào thư mục `D:\nodejs\nodered\`
  + tạo file "D:\nodejs\nodered\run-nodered.cmd" với nội dung (5 dòng sau):
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*
  + mở cmd, chuyển đến thư mục: `D:\nodejs\nodered`
  + cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
  + chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name
2.4. Cài đặt thư viện trên nodered:
- truy cập giao diện nodered bằng url: http://localhost:1880
- cài đặt các thư viện: node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, node-red-contrib-moment, node-red-contrib-influxdb, node-red-contrib-duckdns, node-red-contrib-cron-plus
- Sửa file `D:\nodejs\nodered\work\settings.js` : 
  tìm đến chỗ adminAuth, bỏ comment # ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới
    adminAuth: {
        type: "credentials",
        users: [{
            username: "admin",
            password: "chuỗi_mã_hoá_mật_khẩu",
            permissions: "*"
        }]
    }, D:\nodejs\nodered và chạy lệnh nssm restart a1-nodered
2.5 va 2.6 Do máy lag và code bị sai em chưa khắc phục được nên chưa hoàn thành 2 phần này em sẽ nhanh chóng hoàn thiện 2 phần này mong thầy thông cảm và tạo điều kiện cho em ạ

2.5. tạo api back-end bằng nodered:
Khi gọi, Node-RED sẽ truy vấn bảng Hocvien trong SQL Server

Trả về dữ liệu dạng JSON (danh sách hv phù hợp với từ khóa tìm kiếm).

Trên Nodered, ở flow 1 sử dụng http in và http response để tạo api

Thêm node MSSQL để kết nối và truy vấn tới cơ sở dữ liệu

Logic Flow sẽ gồm 4 node sau (thứ tự nối dây):

2.7. Nhận xét bài làm của mình:
 * Qua quá trình thực hiện bài tập này, em đã hiểu rõ hơn về quy trình cài đặt, cấu hình và tích hợp các thành phần trong một hệ thống web hoàn chỉnh.

- Về cài đặt phần mềm và thư viện:
Em đã nắm được cách cài đặt và cấu hình Node.js, Node-RED, SQL Server, Apache, cũng như cách thêm các thư viện mở rộng (node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, moment, v.v...) vào Node-RED.
Qua đó, em hiểu được vai trò của từng phần mềm trong hệ thống: Node-RED xử lý logic, SQL lưu dữ liệu, Apache hiển thị giao diện người dùng.

- Về tạo API back-end bằng Node-RED:
Em đã biết cách sử dụng các node HTTP In, Function, MSSQL, và HTTP Response để xây dựng một API hoàn chỉnh.
Em hiểu cách xử lý tham số truy vấn từ client, gửi câu lệnh SQL đến cơ sở dữ liệu, và trả kết quả dạng JSON về cho phía front-end. Việc này giúp em hình dung rõ hơn cách một API hoạt động thực tế.Tuy nhiên do bị lỗi máy và code lỗi em chưa tìm được khắc phục nên chưa hoàn chỉnh được bài đúng yêu cầut

- Về tương tác giữa front-end và back-end:
Em đã tìm hiểu và hiểu cách dùng JavaScript (fetch API) trên giao diện web để gửi yêu cầu đến Node-RED API, nhận dữ liệu JSON trả về và hiển thị kết quả lên giao diện.Tuy nhiên do bị lỗi máy và code lỗi em chưa khắc phục được nên chưa hoàn chỉnh được bài đúng yêu cầu

*Tự đánh giá:
Bài làm giúp em củng cố kiến thức về mô hình client–server, API, cơ sở dữ liệu, và tích hợp hệ thống. Mặc dù còn một số bước cần tìm hiểu thêm về bảo mật và tối ưu, nhưng nhìn chung em đã hiểu được toàn bộ quy trình xây dựng một ứng dụng web hoàn chỉnh từ đầu đến cuối.Ngoài ra còn một số phần em chưa thực hiện dược do máy chậm và lỗi 












