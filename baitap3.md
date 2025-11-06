Bài tập 3   : môn Phát triển ứng dụng trên nền web
Giảng viên  : Đỗ Duy Cốp
Lớp học phần: 58KTPM
Ngày giao   : 2025-10-24 13:50
Hạn nộp     : 2025-11-05 00:00
--------------------------------------------------
Yêu cầu     : LẬP TRÌNH ỨNG DỤNG WEB trên nền linux
1. Cài đặt môi trường linux: SV chọn 1 trong các phương án
 - enable wsl: cài đặt docker desktop
 - enable wsl: cài đặt ubuntu
 - sử dụng Hyper-V: cài đặt ubuntu
 - sử dụng VMware : cài đặt ubuntu
 - sử dụng Virtual Box: cài đặt ubuntu
2. Cài đặt Docker (nếu dùng docker desktop trên windows thì nó có ngay)
3. Sử dụng 1 file docker-compose.yml để cài đặt các docker container sau: 
   mariadb (3306), phpmyadmin (8080), nodered/node-red (1880), influxdb (8086), grafana/grafana (3000), nginx (80,443)
4. Lập trình web frontend+backend:
 SV chọn 1 trong các web sau:
 4.1 Web thương mại điện tử
 - Tạo web dạng Single Page Application (SPA), chỉ gồm 1 file index.html, toàn bộ giao diện do javascript sinh động.
 - Có tính năng login, lưu phiên đăng nhập vào cookie và session
   Thông tin login lưu trong cơ sở dữ liệu của mariadb, được dev quản trị bằng phpmyadmin, yêu cầu sử dụng mã hoá khi gửi login.
   Chỉ cần login 1 lần, bao giờ logout thì mới phải login lại.
 - Có tính năng liệt kê các sản phẩm bán chạy ra trang chủ
 - Có tính năng liệt kê các nhóm sản phẩm
 - Có tính năng liệt kê sản phẩm theo nhóm
 - Có tính năng tìm kiếm sản phẩm
 - Có tính năng chọn sản phẩm (đưa sản phẩm vào giỏ hàng, thay đổi số lượng sản phẩm trong giỏ, cập nhật tổng tiền)
 - Có tính năng đặt hàng, nhập thông tin giao hàng => được 1 đơn hàng.
 - Có tính năng dành cho admin: Thống kê xem có bao nhiêu đơn hàng, call để xác nhận và cập nhật thông tin đơn hàng. chuyển cho bộ phận đóng gói, gửi bưu điện, cập nhật mã COD, tình trạng giao hàng, huỷ hàng,...
 - Có tính năng dành cho admin: biểu đồ thống kê số lượng mặt hàng bán được trong từng ngày. (sử dụng grafana)
 - backend: sử dụng nodered xử lý request gửi lên từ javascript, phản hồi về json.
 4.2 Web IOT: Giám sát dữ liệu IOT.
 - Tạo web dạng Single Page Application (SPA), chỉ gồm 1 file index.html, toàn bộ giao diện do javascript sinh động.
 - Có tính năng login, lưu phiên đăng nhập vào cookie và session
   Thông tin login lưu trong cơ sở dữ liệu của mariadb, được dev quản trị bằng phpmyadmin, yêu cầu sử dụng mã hoá khi gửi login.
   Chỉ cần login 1 lần, bao giờ logout thì mới phải login lại.
 - hiển thị giá trị mới nhất của các thông số đang giám sát, khi click vào thì hiển thị đồ thị lịch sử quá trình thay đổi (gọi grafana iframe để hiển thị)
 - backend: Sử dụng nodered để đọc dữ liệu từ các cảm biến (có thể dùng api online để lấy dữ liệu theo giời gian thực), 
   nodered sẽ lưu dữ liệu mới nhất (dạng update) vào cơ sở dữ liệu mariadb (sử dụng phpmyadmin để tạp table và quản trị lần đầu)
   nodered sẽ lưu dữ liệu (insert) vào influxdb để lưu giá trị lịch sử, để cho grafana dùng để hiển thị biểu đồ.
5. Nginx làm web-server
 - Cấu hình nginx để chạy được website qua url http://fullname.com  (thay fullname bằng chuỗi ko dấu viết liền tên của bạn)
 -55
Yêu cầu sinh viên lưu code trên github
có file readme.md có hình ảnh + text: ghi lại nhật ký quá trình làm bài.

CÁCH ĐÁNH GIÁ:
1. Cài đặt được môi trường: 1đ
2. Cài đặt được các docker container với cấu hình phù hợp: 1đ
3. Web chạy được, giao diện phù hợp, chạy trên web sever nginx: 2đ
4. nodered api trả về json, test được: 2đ
5. front-end có js gọi được api nodered, nhận về json, hiển thị được kết quả từ json này. 2đ
6. Bài làm có dấu ấn, giải thích rõ ràng, hiểu vấn đề: 2đ


BÀI LÀM
1. CÀI ĐẶT MÔI TRƯỜNG LINUX
✅ Cách dễ nhất (nên chọn):

Trên Windows 10/11:
bash:
wsl --install

<img width="1920" height="1080" alt="Screenshot (14)" src="https://github.com/user-attachments/assets/c697f7ac-de7f-4e3f-9d4d-37f0dd3527d4" />

wsl --set-default-version 2
wsl --install -d Ubuntu

<img width="1920" height="1080" alt="Screenshot (15)" src="https://github.com/user-attachments/assets/48f7094e-5786-4a8d-b58b-28383f75f9f9" />

# Sau khi cài xong, chạy:

sudo apt update && sudo apt upgrade -y

sudo apt install docker.io docker-compose -y

sudo usermod -aG docker $USER

Rồi khởi động lại WSL.

Sau đó mở Docker ktop có sẵn trên máy

2. FILE docker-compose.yml
   
 Tạo D:/nguyenthihangnga_web/docker-compose.yml
 
 D:/nguyenthihangnga_web/nginx/conf.d/nguyenthihangnga.com.conf

# CẤU HÌNH HOSTS (Windows)
Mở Notepad as Admin → sửa file:

C:\Windows\System32\drivers\etc\hosts

127.0.0.1 nguyenthihangnga.com

<img width="866" height="733" alt="image" src="https://github.com/user-attachments/assets/4bddddbd-1fee-4580-8ea3-d46fb03df7ea" />

3. Sử dụng 1 file docker-compose.yml để cài đặt các docker container sau:
   
   mariadb (3306), phpmyadmin (8080), nodered/node-red (1880), influxdb (8086), grafana/grafana (3000), nginx (80,443)
 # KHỞI ĐỘNG HỆ THỐNG

 docker-compose up -d

 <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/03f90d88-88a2-4405-a350-a413b97303d2" />

Truy cập để kiểm tra 

http://localhost:8080 → phpMyAdmin

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a5c17bc6-2514-4310-92d6-1d8f61593817" />

http://localhost:1880 → Node-RED

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c3e470ca-b45f-4085-9bce-ca5b129530de" />

http://localhost:3000 → Grafana

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/56006b76-c8db-4fb6-b6a8-85d2f4a0cc18" />


 4.2 Web IOT: Giám sát dữ liệu IOT.
 
 # Tạo cơ sở dữ liệu MariaDB
 
# 1 Mở phpMyAdmin:
 
Mở trình duyệt → vào:

http://localhost:8080

Đăng nhập:

Username: root

Password: 123456
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/3c3af39b-60fc-430b-9251-5597b5b2f438" />
# 2 Tạo bảng dữ liệu

Chọn database iotdb → tab SQL

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0bfc689c-4c78-42ba-92ec-b080bfb34470" />

Bấm Go
<img width="1920" height="1020" alt="Screenshot 2025-11-06 214432" src="https://github.com/user-attachments/assets/9f4e9e22-5071-4521-9dc7-f9bcafcc5d28" />

<img width="1920" height="1020" alt="Screenshot 2025-11-06 214418" src="https://github.com/user-attachments/assets/b1a740f9-d797-4acf-80a7-d241d59dbb93" />


# 3 CẤU HÌNH NODERED và CHO NODERED GUI DỮ LIỆU GIẢ LẬP VÀO DATABASE

(chưa kết nối được nodered với database nên chưa lấy được dữ liệu do lỗi hệ thống em chưa biết cách khắc phục)

Cài Node MySQL (Nếu chưa cài)

Trong cửa sổ Manage Palette (nơi bạn vừa cài InfluxDB), tìm kiếm node-red-node-mysql (Nếu bạn chưa cài) và bấm Install.

mport và Deploy Flow

Đóng cửa sổ Manage Palette.

Vào Menu (3 gạch ngang) -> Import -> Clipboard.

Dán code JSON từ file D:/nguyenthihangnga_web/web/json.txt vào.

Nhấn nút Deploy (màu đỏ) ở góc trên bên phải.

→ Deploy V

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/06243d53-03a6-47e7-8d9e-44f35c959215" />


<img width="1920" height="754" alt="image" src="https://github.com/user-attachments/assets/f8fba270-7638-47c6-b07f-c0c81dbab5ae" />

# 4 HIỂN THỊ DỮ LIỆU

(chưa kết nối được nodered nên chưa lấy được dữ liệu vẽ biểu đồ do lỗi hệ thống em chưa biết cách khắc phục)

1 TRÊN GRAFANA
• Mở Grafana:
arduino
http://localhost:3000

Đăng nhập:

Username: admin

Password: admin123
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/97ad131a-88ba-45e3-9491-17f3215c01e0" />

Đổi mật khẩu khi yêu cầu.

2 Thêm Data Sourcue

Chọn Connection → Data Sources → Add data source

• Chọn InfluxDB

• URL: http://influxdb:8086

• Database: iotdb

• Save & Test V
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/d26139a3-33e1-4a16-8c2c-cceb252c6a84" />


3 Tạo Dashboard
• Add panel → chọn dữ liệu từ InfluxDB
<img width="1920" height="1020" alt="Screenshot 2025-11-06 124435" src="https://github.com/user-attachments/assets/50740262-ff0a-445c-8784-529a212deea2" />

TẠO PANEL MỚI

Nhấn nút + Add visualization (giữa màn hình)
<img width="1920" height="1020" alt="Screenshot 2025-11-06 124435" src="https://github.com/user-attachments/assets/30953526-2d72-45bf-b9b0-9700373106a0" />

Chọn Data source: InfluxDB (cái bạn đã kết nối thành công)

CHỌN LOẠI BIỂU ĐỒ
Bên phải → Visualization → Chọn: Time series

LƯU DASHBOARD

Nhấn Apply (góc trên phải)

Nhấn Save dashboard (biểu tượng đĩa)

Đặt tên: iotdb

Nhấn Save

GỬI DỮ LIỆU MẪU TỪ NODE-RED (ĐỂ THẤY BIỂU ĐỒ SỐNG)

1. Mở Node-RED: http://localhost:1880

2. Dán flow này (copy → Menu → Import)
   
# Frondend

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/1fef8580-8b83-44a0-a97f-2d06c7055a52" />

5 Cấu hình nginx

- Cổng 80 trên Windows thường bị khóa và chiếm dụng bởi các dịch vụ mặc định của hệ thống (như World Wide Web Publishing Service hoặc IIS), ngay cả khi chạy Docker với quyền Administrator.Để đảm bảo ứng dụng chạy được mà không cần tắt các dịch vụ hệ thống của Windows, em đã phải điều chỉnh cấu hình Volume trong docker-compose.yml để map cổng dự phòng:Chuyển Nginx từ cổng 80 sang cổng 81.


<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/9ad7194d-8f1c-4926-b331-7c079fac46fc" />

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/1fef8580-8b83-44a0-a97f-2d06c7055a52" />

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/4670d5f8-7dfd-48ad-aacb-7f6ffaffc0f4" />


