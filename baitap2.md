Bài tập 02: Lập trình web.
==============================
NGÀY GIAO: 19/10/2025
==============================
DEADLINE: 26/10/2025
==============================

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
    },   
   với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php
- chạy lại nodered bằng cách: mở cmd, vào thư mục `D:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
  khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880
2.5. tạo api back-end bằng nodered:
- tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
- thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
- logic flow sẽ gồm 4 node theo thứ tự sau (thứ tự nối dây): 
  1. http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  2. function : để tiền xử lý dữ liệu gửi đến
  3. MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
  4. http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
  có thể thêm node `debug` để quan sát giá trị trung gian.
- test api thông qua trình duyệt, ví dụ: http://localhost:1880/timkiem?q=thị
2.6. Tạo giao diện front-end:
- html form gồm các file : index.html, fullname.js, fullname.css
  cả 3 file này đặt trong thư mục: `D:\Apache24\fullname`
  nhớ thay fullname là tên của bạn, viết liền, ko dấu, chữ thường, vd tên là Đỗ Duy Cốp thì fullname là `doduycop`
  khi đó 3 file sẽ là: index.html, doduycop.js và doduycop.css
- index.html và fullname.css: trang trí tuỳ ý, có dấu ấn cá nhân, có form nhập được thông tin.
- fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước 2.5, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn của bạn.



BÀI LÀM 

BƯỚC 1: CÀI ĐẶT APACHE WEB SERVER

1.1. Tắt IIS (nếu có)
cmdiisreset /stop
<img width="1103" height="639" alt="image" src="https://github.com/user-attachments/assets/b05fa8e9-7caa-49da-9175-3ca92af3eca8" />

1.2. Download & giải nén Apache

Link: https://www.apachelounge.com/download/
Tải: httpd-2.4.-win64-VS17.zip 
Giải nén vào: D:\Apache24
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/98edeff1-3ba9-4adb-8c3a-3088638204e0" />

1.3. Tạo thư mục web
D:\Apache24\nguyenthihangnga

1.4. Sửa file httpd.conf
Mở: D:\Apache24\conf\httpd.conf
Tìm và sửa:
# ServerRoot
ServerRoot "D:/Apache24"
# DocumentRoot
DocumentRoot "D:/nguyenthihangnga"
<Directory "D:/Apache24/nguyenthihangnga">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
# ServerName
ServerName nguyenthihangnga.com
# Listen
Listen 80
# LoadModule
LoadModule rewrite_module modules/mod_rewrite.so
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0ce00264-50da-4221-a2be-20f5fd66bbad" />

1.5. Sửa file httpd-vhosts.conf
Mở: D:\Apache24\conf\extra\httpd-vhosts.conf
Thêm vào cuối:
<VirtualHost *:80>
    ServerName nguyenthihangnga.com
    DocumentRoot "D:/Apache24/nguyenthihangnga"
    <Directory "D:/Apache24/nguyenthihangnga">
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog "logs/nguyenthihangnga.com-error.log"
    CustomLog "logs/nguyenthihangnga.com-access.log" common
</VirtualHost>
<img width="1920" height="1021" alt="image" src="https://github.com/user-attachments/assets/f430dc15-82b0-47a5-b114-5dd328dff281" />


1.6. Fake domain trong hosts
Mở: C:\Windows\System32\drivers\etc\hosts (dùng Notepad quyền Admin)
Thêm dòng:
127.0.0.1  nguyenthihangnga.com
<img width="1920" height="1021" alt="image" src="https://github.com/user-attachments/assets/cad255bc-046f-45ef-8c67-078775f97d62" />

1.7. Cài & khởi động Apache
Mở CMD (Admin) → chạy:
cmd cd /d D:\Apache24\bin
httpd.exe -k install
httpd.exe -k start
<img width="2568" height="1926" alt="image" src="https://github.com/user-attachments/assets/0f3291d2-a4fc-41c0-af16-469aabe3fbfa" />
Truy cập: http://ngyenthihangnga.com → thấy "index" là thành công

BƯỚC 2: CÀI NODEJS & NODERED
* Cài Node.js

Tải: https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi

Cài vào: D:\nodejs
node -v  → v20.19.5
npm -v
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/05f3cb66-963f-4847-aaef-064c610e046f" />

* Cài Node-RED
cd /d D:\nodejs
npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0088e58e-3dba-4a9e-91c5-2687ec442fbb" />

* Tải NSSM

Link: https://nssm.cc/release/nssm-2.24.zip
Giải nén → copy nssm.exe (64-bit) vào: D:\nodejs\nodered\

* Tạo file run-nodered.cmd
Tạo file: D:\nodejs\nodered\run-nodered.cmd
@echo off
REM fix path
set PATH=D:\nodejs;%PATH%
REM Run Node-RED
node "D:\nodejs\nodered\node_modules\node-red\red.js" -u "D:\nodejs\nodered\work" %*
<img width="1920" height="1080" alt="Screenshot (8)" src="https://github.com/user-attachments/assets/777baf36-2fdf-4fcb-af5c-c213b48c553f" />


* Cài service Node-RED
cd /d D:\nodejs\nodered
nssm.exe install a1-nodered "D:\nodejs\nodered\run-nodered.cmd"
<img width="1920" height="2560" alt="image" src="https://github.com/user-attachments/assets/05353c4e-9e58-4c5b-97ba-29d7b94df26b" />

Cửa sổ hiện ra → OK
Cài đặt thành công 
<img width="1920" height="1080" alt="Screenshot 2025-11-04 184339" src="https://github.com/user-attachments/assets/e0f4f0ba-8ca5-452a-9e68-29c89f375869" />

2.3. Tạo csdl tuỳ ý trên mssql (sql server 2022), nhớ các thông số kết nối: ip, port, username, password, db_name, table_name

Port: 1433

Username: 

Password: linh2112@

DB_Name: qlhv_nodered

Table_Name: HocVien, Lop, KetQua

<img width="1014" height="645" alt="image" src="https://github.com/user-attachments/assets/1a2ec994-aab4-4853-be27-13714ffe910a" />


2.4. Cài đặt thư viện trên nodered:

- Truy cập giao diện nodered bằng url: http://localhost:1880 trên trình duyệt. Nếu đã cài service a1-nodered sẽ có giao diện flow editor.
<img width="1045" height="467" alt="image" src="https://github.com/user-attachments/assets/e774bf17-6ad6-4e67-ad11-1b87a9669baf" />

- Cài đặt các thư viện cần thiết: Tại giao diện Node-RED ➡️ Vào Menu ➡️ Manage palette ➡️ Install tiến hành cài đặt lần lượt theo các thư viện bên dưới.
  
node-red-contrib-mssql-plus

node-red-node-mysql

node-red-contrib-telegrambot

node-red-contrib-moment

node-red-contrib-influxdb

node-red-contrib-duckdns

node-red-contrib-cron-plus

<img width="1037" height="474" alt="image" src="https://github.com/user-attachments/assets/c96bd700-c85c-4901-8020-5c5f5e45bae9" />

 Cài đặt thành công các thư viện ✅
 
- Cấu hình tài khoản đăng nhập (adminAuth) mở file D:\nodejs\nodered\work\settings.js tìm đến chỗ adminAuth, bỏ comment // ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới.
  <img width="1168" height="366" alt="image" src="https://github.com/user-attachments/assets/8dd4288a-bfb1-49e0-9f71-b22aa8979139" />
  <img width="986" height="216" alt="image" src="https://github.com/user-attachments/assets/fd1e6e8b-fdb3-429c-a85c-828482db9a5c" />
  
 - Truy cập tool: https://tms.tnut.edu.vn/pw.php ➡️ Nhập password: chuoimahoamatkhau vào ô và click Hash Password ➡️ Copy chuỗi mã hóa dán vào chỗ "chuoi_ma_hoa_mat_khau" và lưu file.

<img width="838" height="282" alt="image" src="https://github.com/user-attachments/assets/225b8151-7cec-458e-8453-1450baebbf5a" />

- Khởi động lại Node-RED bằng cách: mở cmd, vào thư mục D:\nodejs\nodered và chạy lệnh nssm restart a1-nodered
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4c624f94-5535-461e-9a03-6a56876ecb67" />

- Lúc này Node-RED sẽ yêu cầu đăng nhập bằng user admin và password mới vào được giao diện cho admin tại: http://localhost:1880

2.5. tạo api back-end bằng nodered:

Tạo API tìm kiếm học  nhận tham số từ url trả về json http://localhost:1880/timkiem?q=chung

Khi gọi, Node-RED sẽ truy vấn bảng Hocvien trong SQL Server

Trả về dữ liệu dạng JSON (danh sách hv phù hợp với từ khóa tìm kiếm).

Trên Nodered, ở flow 1 sử dụng http in và http response để tạo api

Thêm node MSSQL để kết nối và truy vấn tới cơ sở dữ liệu

Logic Flow sẽ gồm 4 node sau (thứ tự nối dây):

<img width="1785" height="973" alt="image" src="https://github.com/user-attachments/assets/c37bbcb0-c8d2-40f5-b843-d2a8faac1b6e" />

<img width="769" height="699" alt="image" src="https://github.com/user-attachments/assets/1b3c479b-e0bd-4986-84e8-44dd2f3ff93c" />

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











