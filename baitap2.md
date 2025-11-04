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
2.7. Nhận xét bài làm của mình:
- đã hiểu quá trình cài đặt các phần mềm và các thư viện như nào?
- đã hiểu cách sử dụng nodered để tạo api back-end như nào?
- đã hiểu cách frond-end tương tác với back-end ra sao?
==============================
TIÊU CHÍ CHẤM ĐIỂM:
1. y/c bắt buộc về thời gian: ko quá Deadline, quá: 0 điểm (ko có ngoại lệ)
2. cài đặt được apache và nodejs và nodered: 1đ
3. cài đặt được các thư viện của nodered: 1đ
4. nhập dữ liệu demo vào sql-server: 1đ
5. tạo được back-end api trên nodered, test qua url thành công: 1đ
6. tạo được front-end html css js, gọi được api, hiển thị kq: 1đ
7. trình bày độ hiểu về toàn bộ quá trình (mục 2.7): 5đ
==============================
GHI CHÚ:
1. yêu cầu trên cài đặt trên ổ D, nếu máy ko có ổ D có thể linh hoạt chuyển sang ổ khác, path khác.
2. có thể thực hiện trực tiếp trên máy tính windows, hoặc máy ảo
3. vì csdl là tuỳ ý: sv cần mô tả rõ db chứa dữ liệu gì, nhập nhiều dữ liệu test có nghĩa, json trả về sẽ có dạng như nào cũng cần mô tả rõ.
4. có thể xây dựng nhiều API cùng cơ chế, khác tính năng: như tìm kiếm, thêm, sửa, xoá dữ liệu trong DB.
5. bài làm phải có dấu ấn cá nhân, nghiêm cấm mọi hình thức sao chép, gian lận (sẽ cấm thi nếu bị phát hiện gian lận).
6. bài tập thực làm sẽ tốn nhiều thời gian, sv cần chứng minh quá trình làm: save file `readme.md` mỗi khoảng 15-30 phút làm : lịch sử sửa đổi sẽ thấy quá trình làm này!
7. nhắc nhẹ: github ko fake datetime được.
8. sv được sử dụng AI để tham khảo.
==============================
DEADLINE: 26/10/2025
==============================

./.



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
Password: 123456
DB_Name: qlhv_nodered
Table_Name: HocVien, Lop, KetQua

2.4. Cài đặt thư viện trên nodered:
- Truy cập giao diện nodered bằng url: http://localhost:1880 trên trình duyệt. Nếu đã cài service a1-nodered sẽ có giao diện flow editor.
- <img width="1911" height="1052" alt="image" src="https://github.com/user-attachments/assets/cdebce88-c3aa-4b95-986f-c34b681e1fd5" />
- Cài đặt các thư viện cần thiết: Tại giao diện Node-RED Vào Menu -> Manage palette ->Install tiến hành cài đặt lần lượt theo các thư viện bên dưới.
  
node-red-contrib-mssql-plus
node-red-node-mysql
node-red-contrib-telegrambot
node-red-contrib-moment
node-red-contrib-influxdb
node-red-contrib-duckdns
node-red-contrib-cron-plus

<img width="1042" height="473" alt="image" src="https://github.com/user-attachments/assets/480cef30-a9ad-4413-a58f-b2367a055a7b" />

- Cấu hình tài khoản đăng nhập (adminAuth) mở file D:\nodejs\nodered\work\settings.js tìm đến chỗ adminAuth, bỏ comment // ở đầu dòng (8 dòng), thay chuỗi mã hoá mật khẩu bằng chuỗi mới.

<img width="1168" height="366" alt="image" src="https://github.com/user-attachments/assets/a4688122-205c-4852-944f-ecd65397701d" />

<img width="986" height="261" alt="image" src="https://github.com/user-attachments/assets/d8ab651b-832a-4788-8cf9-e3ab7a74f901" />

- Khởi động lại Node-RED bằng cách: mở cmd, vào thư mục :\nodejs\nodered và chạy lệnh nssm restart a1-nodered

<img width="1100" height="261" alt="image" src="https://github.com/user-attachments/assets/9a91aec3-2e98-4ac2-bb22-d0602d81c48f" />

- Lúc này Node-RED sẽ yêu cầu đăng nhập bằng user admin và password mới vào được giao diện cho admin tại: http://localhost:1880
  <img width="1039" height="465" alt="image" src="https://github.com/user-attachments/assets/67957d6e-9939-436d-90fc-49ec6e688712" />
  
2.5. tạo api back-end bằng nodered:
Tạo API tìm kiếm nhà nhận tham số từ url trả về json http://localhost:1880/timkiem?q=chung
Khi gọi, Node-RED sẽ truy vấn bảng Hocvien trong SQL Server
Trả về dữ liệu dạng JSON (danh sách  phù hợp với từ khóa tìm kiếm).
Trên Nodered, ở flow 1 sử dụng http in và http response để tạo api
Thêm node MSSQL để kết nối và truy vấn tới cơ sở dữ liệu
Logic Flow sẽ gồm 4 node sau (thứ tự nối dây):
Cấu hình từng node trong Node-RED
- http in : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /timkiem
  
2.6. Tạo giao diện front-end:

2.7. Nhận xét bài làm của mình:
 * Qua quá trình thực hiện bài tập này, em đã hiểu rõ hơn về quy trình cài đặt, cấu hình và tích hợp các thành phần trong một hệ thống web hoàn chỉnh.

- Về cài đặt phần mềm và thư viện:
Em đã nắm được cách cài đặt và cấu hình Node.js, Node-RED, SQL Server, Apache, cũng như cách thêm các thư viện mở rộng (node-red-contrib-mssql-plus, node-red-node-mysql, node-red-contrib-telegrambot, moment, v.v...) vào Node-RED.
Qua đó, em hiểu được vai trò của từng phần mềm trong hệ thống: Node-RED xử lý logic, SQL lưu dữ liệu, Apache hiển thị giao diện người dùng.

- Về tạo API back-end bằng Node-RED:
Em đã biết cách sử dụng các node HTTP In, Function, MSSQL, và HTTP Response để xây dựng một API hoàn chỉnh.
Em hiểu cách xử lý tham số truy vấn từ client, gửi câu lệnh SQL đến cơ sở dữ liệu, và trả kết quả dạng JSON về cho phía front-end. Việc này giúp em hình dung rõ hơn cách một API hoạt động thực tế.

- Về tương tác giữa front-end và back-end:
Em đã biết cách dùng JavaScript (fetch API) trên giao diện web để gửi yêu cầu đến Node-RED API, nhận dữ liệu JSON trả về và hiển thị kết quả lên giao diện.
Nhờ đó, em hiểu rõ mối liên hệ giữa giao diện người dùng (front-end) và xử lý dữ liệu phía máy chủ (back-end).

*Tự đánh giá:
Bài làm giúp em củng cố kiến thức về mô hình client–server, API, cơ sở dữ liệu, và tích hợp hệ thống. Mặc dù còn một số bước cần tìm hiểu thêm về bảo mật và tối ưu, nhưng nhìn chung em đã hiểu được toàn bộ quy trình xây dựng một ứng dụng web hoàn chỉnh từ đầu đến cuối.Ngoài ra còn một số phần em chưa thực hiện dược do máy lag ạ












