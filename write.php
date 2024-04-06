<?php
//1. POSTデータ取得
$name       = $_POST['name'];
$email      = $_POST['email'];
$birthday   = $_POST['birthday'];
$job        = $_POST['job'];
$experience = $_POST['experience'];

$str = $name . $email . $birthday . $job . $experience;

$file  = fopen("data.csv", "a");
fwrite($file, $str . "\n");
fclose($file);
?>


<?php
// 2. DB接続します
try {
    //Password:MAMP=‘root’,XAMPP=‘’
    $pdo = new PDO('mysql:dbname=freddy_kadai08;charset=utf8;host=mysql57.freddy.sakura.ne.jp', 'freddy', '***********');
} catch (PDOException $e) {
    exit('DB_CONECT:' . $e->getMessage());
}

// try {
//     //Password:MAMP='root',XAMPP=''
//     $pdo = new PDO('mysql:dbname=kadai08;charset=utf8;host=localhost','root','');
//   } catch (PDOException $e) {
//     exit('DBConnection Error:'.$e->getMessage());
//   }



// ３．データ登録SQL作成
$sql = "INSERT INTO kadai08_an_table(id, name, email, birthday, job, experience, indate)VALUES(NULL, :name, :email, :birthday, :job, :experience, NOW());";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':name',        $name,       PDO::PARAM_STR);  //Integer（数値の場合 PDO::PARAM_INT)
$stmt->bindValue(':email',       $email,      PDO::PARAM_STR);  
$stmt->bindValue(':birthday',    $birthday,   PDO::PARAM_STR);  
$stmt->bindValue(':job',         $job,        PDO::PARAM_STR);  
$stmt->bindValue(':experience',  $experience, PDO::PARAM_STR);  
$status = $stmt->execute();


// //4. データ登録SQL作成
// $sql = "INSERT INTO kadai08_an_table(name, email, birthday, job, experience, indate) VALUES(:name, :email, :birthday, :job, :experience, NOW())";
// $stmt = $pdo->prepare($sql);
// $stmt->bindValue(':name',        $name,       PDO::PARAM_STR);
// $stmt->bindValue(':email',       $email,      PDO::PARAM_STR);  
// $stmt->bindValue(':birthday',    $birthday,   PDO::PARAM_STR);  
// $stmt->bindValue(':job',         $job,        PDO::PARAM_STR);  
// $stmt->bindValue(':experience',  $experience, PDO::PARAM_STR);  

    

// 自動返信メール(お客様へ)
mb_language("Japanese");
mb_internal_encoding("UTF-8");

$header = null;
$auto_reply_subject = null;
$auto_reply_text = null;
date_default_timezone_set('Asia/Tokyo');

// ヘッダー情報を設定
$header = "MIME-Version: 1.0\n";
$header .= "From: G'sテスト大嶺 <r.ohmine@freddy.co.jp>\n";
$header .= "Reply-To:G'sテスト大嶺 <r.ohmine@freddy.co.jp>\n"; 

// 件名を設定
$auto_reply_subject = '【Gsテスト】ご登録ありがとうございます。';

// 本文を設定
$auto_reply_text = "*注意*Gs課題のテストメールです" . "\n";
$auto_reply_text .= "REONA KUSHIDA様" . "\n\n";
$auto_reply_text .= "登録完了しました。" . "\n";
$auto_reply_text .= "担当者から連絡します。" . "\n\n";
$auto_reply_text .= "hogehoge。";

// メール送信
mb_send_mail( $_POST['email'], $auto_reply_subject, $auto_reply_text, $header);



// 自動返信メール(自分へ）
mb_language("Japanese");
mb_internal_encoding("UTF-8");

$header = null;
$auto_reply_subject = null;
$auto_reply_text = null;
date_default_timezone_set('Asia/Tokyo');

// ヘッダー情報を設定
$header = "MIME-Version: 1.0\n";
$header .= "From: G'sテスト大嶺 <r.ohmine@freddy.co.jp>\n";
$header .= "Reply-To:G'sテスト大嶺 <r.ohmine@freddy.co.jp>\n"; 

// 件名を設定
$auto_reply_subject = '【Gsテスト】'.$name.'様から登録がありました。';

// 本文を設定
$auto_reply_text = "*注意*Gs課題のテストメールです" . "\n";
$auto_reply_text .= "ご担当者様" . "\n\n";
$auto_reply_text .= "$name'様から登録がありました。" . "\n";
$auto_reply_text .= "対応をお願いいたします。" . "\n\n";
$auto_reply_text .= "hogehoge。";

// メール送信
mb_send_mail('r.ohmine@freddy.co.jp', $auto_reply_subject, $auto_reply_text, $header);


  
  // 自分に送るお問い合わせ内容メールを構築

//４．データ登録処理後
if ($status == false) {
    //SQL実行時にエラーがある場合（エラーオブジェクト取得して表示）
    $error = $stmt->errorInfo();
    exit("SQL_ERROR:" . $error[2]);
} else {
    //５．リダイレクト
    header("Location: finish.php");
    exit();
}

?>

