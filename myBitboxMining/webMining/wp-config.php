<?php
/**
 * Cấu hình cơ bản cho WordPress
 *
 * Trong quá trình cài đặt, file "wp-config.php" sẽ được tạo dựa trên nội dung 
 * mẫu của file này. Bạn không bắt buộc phải sử dụng giao diện web để cài đặt, 
 * chỉ cần lưu file này lại với tên "wp-config.php" và điền các thông tin cần thiết.
 *
 * File này chứa các thiết lập sau:
 *
 * * Thiết lập MySQL
 * * Các khóa bí mật
 * * Tiền tố cho các bảng database
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Thiết lập MySQL - Bạn có thể lấy các thông tin này từ host/server ** //
/** Tên database MySQL */
define('DB_NAME', 'mybitbox_mining');

/** Username của database */
define('DB_USER', 'root');

/** Mật khẩu của database */
define('DB_PASSWORD', '');

/** Hostname của database */
define('DB_HOST', 'localhost');

/** Database charset sử dụng để tạo bảng database. */
define('DB_CHARSET', 'utf8mb4');

/** Kiểu database collate. Đừng thay đổi nếu không hiểu rõ. */
define('DB_COLLATE', '');

/**#@+
 * Khóa xác thực và salt.
 *
 * Thay đổi các giá trị dưới đây thành các khóa không trùng nhau!
 * Bạn có thể tạo ra các khóa này bằng công cụ
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * Bạn có thể thay đổi chúng bất cứ lúc nào để vô hiệu hóa tất cả
 * các cookie hiện có. Điều này sẽ buộc tất cả người dùng phải đăng nhập lại.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '20ty`a+q3BF{mHBYFF.d2+h4y3&3v |0|uPuw^]L`Tx,$9J@z2%4EyXzhm~lSDn#');
define('SECURE_AUTH_KEY',  '_ni<]^;N6[8vk:=U?XV?=#u4tD6{*-P?]C?4.s4}dEfnqL%3|&Hz7WV$2X9j.eVH');
define('LOGGED_IN_KEY',    'L=,U-`RD2{v9 tZ#~H>BuMZ07zmcL$546VY/!Ct+)d)r($_r/2vkoMrfOY]8`4vs');
define('NONCE_KEY',        'Zm1/pH|W}jSLDSGc* c}h{4hwKn~iN+<[29bqpSgD#W2UeAxHNiJ>Y__pWg3xO6C');
define('AUTH_SALT',        '@ej;oX/|*LBotIWUo)@$8-{kAVqt~s0}$WCvgjN!|Qr&Jk.L+PL+dt4C%<Y[7<wy');
define('SECURE_AUTH_SALT', 'C(|p4=A1VTQ=1OZH&^(dmK*!z2x{kztq^[hWB&BFKh6STsf]1&v!!S5A~kf8(PMv');
define('LOGGED_IN_SALT',   '3Yi(eXb-rfT VR.c*7F=m9MW;d6 c6L*M1F|jkd,n.{:K!JHQ.W(h^Cup ~o06q>');
define('NONCE_SALT',       '~;X<k{U/QYH~BA._{oaflsb2C;WZC>vf66Hg<IP3Ms qQg5M$fBY;eq,39f[wUqD');

/**#@-*/

/**
 * Tiền tố cho bảng database.
 *
 * Đặt tiền tố cho bảng giúp bạn có thể cài nhiều site WordPress vào cùng một database.
 * Chỉ sử dụng số, ký tự và dấu gạch dưới!
 */
$table_prefix  = 'mb';

/**
 * Dành cho developer: Chế độ debug.
 *
 * Thay đổi hằng số này thành true sẽ làm hiện lên các thông báo trong quá trình phát triển.
 * Chúng tôi khuyến cáo các developer sử dụng WP_DEBUG trong quá trình phát triển plugin và theme.
 *
 * Để có thông tin về các hằng số khác có thể sử dụng khi debug, hãy xem tại Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Đó là tất cả thiết lập, ngưng sửa từ phần này trở xuống. Chúc bạn viết blog vui vẻ. */

/** Đường dẫn tuyệt đối đến thư mục cài đặt WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Thiết lập biến và include file. */
require_once(ABSPATH . 'wp-settings.php');
