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
define('AUTH_KEY',         '^G._*t)ol%=wcde;a%q1LZPQQqFbCfw}_Mp4e:QA{C&Ctt2lC<t[<0sWHw][JD=^');
define('SECURE_AUTH_KEY',  '{Y|O4T,7KAb:l>;S7BB0cXSyn?e6$>W >z]+mz!VAo~?R?1,l3ln5a{v2{.Xj mh');
define('LOGGED_IN_KEY',    '#XPk}FOTl^TZDvMdhNP&@N<^6V15qrMJpi{4Zbq+9*3F(okCpaAOj4*1(jAYCGM@');
define('NONCE_KEY',        'dsL _gkZ;U n_75/bz:~*l/6TjvW)JR.=dwG![#Y25(Du&:^qIv{>_CxFd5zKmhJ');
define('AUTH_SALT',        ';_pf~EOyR)4ux{dZ(i|[w#@;nHT0mw+@^CaX0Dx=$TTKS{uf#GVoTB,-pZP/?S?K');
define('SECURE_AUTH_SALT', 'pZkusbNz(*xJME/=W!xG0-j;@^4n+kNXVo hNf%[lchOT|~vuxE[DgP4g;G]h*-f');
define('LOGGED_IN_SALT',   '9yo^g/ ~Ak$z_yLMzj6>Tf[SsL4Qa9*/4!e?{j?/PL/<@(6L&k>Dv?&#$>Z[]G-2');
define('NONCE_SALT',       '(B<An1lP1emgFyjXi4qgx:0pEpj %QV]w4cL<lxRCa-?NXXuqySNUDicQ:+r2{RM');

/**#@-*/

/**
 * Tiền tố cho bảng database.
 *
 * Đặt tiền tố cho bảng giúp bạn có thể cài nhiều site WordPress vào cùng một database.
 * Chỉ sử dụng số, ký tự và dấu gạch dưới!
 */
$table_prefix  = 'wp_';

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
