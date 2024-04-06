<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>会員登録完了</title>
    <link rel="stylesheet" href="./css_folder/style.css">
</head>

<header>
    <?php
    include('html_folder/indexhead.html');
    ?>
</header>


<body>
    <div class="finish">
        <p class="finish_1">会員登録が完了致しました。</p>
        <p class="finish_2">このたびは、会員登録をして頂き誠に<br>
            ありがとうございます。<br>
            ご記入頂いたメールアドレスへ、<br>
            確認メールをお送りしております。<br>

            しばらく経ってもメールが届かない場合は、<br>
            入力頂いたメールアドレスが間違っているか、<br>
            迷惑メールフォルダに振り分けられている<br>
            可能性がございます。<br>
            また、ドメイン指定をされている場合は、<br>
            「@freddy.co.jp」からのメールが受信できるよう<br>
            あらかじめ設定をお願いいたします。</p>
    </div>

    <div>
        <a href="select.php" class="select">（本来は非表示）会員管理画面</a>
    </div>
</body>

<footer>
    <?php
    include('html_folder/indexfoot.html');
    ?>
</footer>


</html>