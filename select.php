<?php
// 1.  DB接続します
try {
    //Password:MAMP='root',XAMPP=''
    $pdo = new PDO('mysql:dbname=freddy_kadai08;charset=utf8;host=mysql621.db.sakura.ne.jp','freddy','************');
} catch (PDOException $e) {
    exit('DB_CONECT:' . $e->getMessage());
}


// try {
//     //Password:MAMP='root',XAMPP=''
//     $pdo = new PDO('mysql:dbname=kadai08;charset=utf8;host=localhost', 'root', '');
// } catch (PDOException $e) {
//     exit('DBConnection Error:' . $e->getMessage());
// }


//２．データ登録SQL作成
$sql = "SELECT * FROM kadai08_an_table";
$stmt = $pdo->prepare($sql);
$status = $stmt->execute();

//３．データ表示
// $view="";
if ($status == false) {
    //execute（SQL実行時にエラーがある場合）
    $error = $stmt->errorInfo();
    exit("SQL_ERROR:" . $error[2]);
}

//全データ取得
$values =  $stmt->fetchAll(PDO::FETCH_ASSOC); //PDO::FETCH_ASSOC[カラム名のみで取得できるモード]
//JSONい値を渡す場合に使う
// $json = json_encode($values,JSON_UNESCAPED_UNICODE);

?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>管理画面</title>
    <link rel="stylesheet" href="./css_folder/select.css">
</head>

<body id="main">
    <!-- Head[Start] -->
    <header>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="index.php">データ登録</a>
                </div>
            </div>
        </nav>
    </header>
    <!-- Head[End] -->



    

    <?php
    // 生年月日から年齢を計算する関数を定義
    function calculateAge($birthdate)
    {
        $today = new DateTime();
        $birthday = new DateTime($birthdate);
        $age2 = $today->diff($birthday)->y;
        return $age2;
    }
    ?>


    <!-- Main[Start] -->
    <div>

        <div class="container jumbotron">
            <table>
                <tr>
                    <th>会員番号</th>
                    <th>名前</th>
                    <th>メールアドレス</th>
                    <th>生年月日</th>
                    <th>年齢（計算）</th>
                    <th>職種</th>
                    <th>2年以上の経験者</th>
                    <th>登録日</th>
                </tr>
                <?php foreach ($values as $value) { ?>
                    <tr>
                        <td><?= $value['id'] ?></td>
                        <td><?= $value['name'] ?></td>
                        <td><?= $value['email'] ?></td>
                        <td><?= $value['birthday'] ?></td>
                        <td><?= $age2 = calculateAge($value['birthday']); ?></td>
                        <td><?= $value['job'] ?></td>
                        <td><?= $value['experience'] ?></td>
                        <td><?= $value['indate'] ?></td>
                    </tr>
                <?php } ?>
            </table>


        </div>
    </div>
    <!-- Main[End] -->


    <script>
        //JSON受け取り
    </script>
</body>

</html>