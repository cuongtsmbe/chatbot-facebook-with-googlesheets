# Hướng dẫn sử dụng bot Messenger kết hợp Google Sheet

Đây là một dự án về bot Messenger kết hợp Google Sheet để lấy thông tin khách hàng và xử lý dữ liệu. Dự án này sử dụng ngôn ngữ nodejs và có thể chạy trên môi trường Docker.

## Google sheet (Example)

https://docs.google.com/spreadsheets/d/17KwoPtSv5mx77c0PFg8VGLzZfyajCo-SDNNBiC1ltuw/edit?usp=sharing
https://docs.google.com/spreadsheets/d/100ebDMj7T8S3_sX9IftGdJ1AF7soH3OUYVVIfHKGDR4/edit#gid=0


## Yêu cầu cài đặt

Trước khi bắt đầu, bạn cần cài đặt các công cụ và thư viện sau:

- Docker và Docker Compose

## Cấu hình

Để sử dụng dự án này, bạn cần cấu hình các thông số sau trong DB:

- `fanpage_id`: ID của fanpage trên Facebook
- `sdt_column`: Vị trí của cột số điện thoại trong Google Sheet (vd: D6:D là cột D, bắt đầu từ hàng 6)
- `madon_column`: Vị trí của cột mã đơn hàng trong Google Sheet
- `start_column` và `end_column`: Vị trí của cột bắt đầu và kết thúc trong Google Sheet để lấy dữ liệu vd (A->D)
- `key_fanpage`: Page access token của fanpage trên Facebook
- `sheet_id`: ID của spread Google Sheet vd "17KwoPtSv5mx77c0PFg8VGLzZfyajCo-SDNNBiC1ltuw"
- `sheet_name`:tên của sheet . vd: banhang

Lưu ý : Bạn cần chia sẻ Google Sheet với địa chỉ email phanhuucuong05012001@gmail.com với quyền truy cập bất kỳ để cho phép bot truy cập vào dữ liệu.

## Sử dụng

Để chạy dự án, bạn làm theo các bước sau:

1. Di chuyển đến thư mục dự án
2. Thay đổi giá trị `MYSQL_HOST` trong file `.env` để trỏ đến IP hoặc container của MySQL
3. Chạy lệnh `./run-up.sh` để khởi động dự án. Nếu muốn dừng dự án, bạn có thể chạy lệnh `./run-down.sh`.
4. Thêm DB vào container `ggsheet-mysql` nếu chưa có


Bot sẽ lấy thông tin từ Google Sheet nếu tin nhắn của khách hàng có chứa từ khóa "sdt:" hoặc "madon:".


## API

- Login: `POST /authenticate/login/local`,
- Hash password: `GET /authentication/hash/password`,
- Get all users: `GET /user/get/all`,
- Get user details by fanpage id: `GET /user/get/details/by/:fanpage_id`,
- Add new user: `POST /user/add/new`,
- Update user by fanpage id: `PUT /user/update/by/fbid`,
- Update user status by ID: `PUT /user/update/status/by/fbid`,
- Delete user by ID: `DELETE /user/delete/by/fbid`

Vui lòng xem document API chi tiết trong file `api-document.md`.


## Thông tin liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng liên hệ với chúng tôi qua địa chỉ email phanhuucuong05012001@gmail.com.
