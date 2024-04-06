<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>会員登録</title>
    <link rel="stylesheet" href="./css_folder/style.css">
</head>

<header>
    <?php
    include('html_folder/indexhead.html');
    ?>

</header>

<body>
    <section class="entry2">
        <div>
            <div class="entry_title">
                <div class="membership">
                    <p>会員登録</p>
                </div>
                <div class="entry_title_p">
                <p>
                    以下より会員登録をお願いいたします。<br />
                    登録完了後、メールのご案内が送られますので<br />
                    ご確認をよろしくお願いいたします。
                </p>
                </div>
            </div>

            <form class="form" action="write.php" method="post" name="form">
                <label class="label_contents" for="name">
                    <div class="label_title">
                        <p>お名前</p>
                        <p id="red">*</p>
                    </div>
                    <input type="text" id="name" name="name" placeholder="名字　名前" required size="30" />
                </label>

                <label for="email">
                    <div class="label_title">
                        <p>メールアドレス</p>
                        <p id="red">*</p>
                    </div>
                    <input type="email" id="email" size="30" name="email" placeholder="example@gmail.com" required />
                </label>

                <label for="birthday">
                    <div class="label_title">
                        <p>生年月日</p>
                        <p id="red">*</p>
                    </div>
                    <input type="date" id="birthday" name="birthday" required />
                </label>
                
                <label for="job">
                    <div class="label_title">
                        <p>職種</p>
                        <p id="red">*</p>
                    </div>
                    <select name="job" id="job-select">
                        <option value="">--該当職種をお選びください--</option>
                        <option value="エンジニア">エンジニア</option>
                        <option value="デザイナー">デザイナー</option>
                        <option value="マーケター">マーケター</option>
                        <option value="その他">その他</option>
                    </select>
                </label>

                    <div class="label_title">
                        <p>実務経験は2年以上ありますか？</p>
                        <p id="red">*</p>
                    </div>
                    <div>
                        <input type="radio" id="experience" name="experience" value="はい" checked />
                        <label for="はい">はい</label>
                    </div>
                    <div>
                        <input type="radio" id="no-experience" name="experience" value="いいえ" />
                        <label for="いいえ">いいえ</label>
                    </div>

                <div>
                    <div class="doui">
                        <p><a href="">利用規約</a>と<a href="">プライバシーポリシー</a>をご確認の上、「同意して登録する」ボタンを押してください。</p>
                    </div>
                </div>
                <button>同意して登録する</button>
            </form>
        </div>
    </section>
</body>


<footer>
    <?php
    include('html_folder/indexfoot.html');

    ?>
</footer>

</html>