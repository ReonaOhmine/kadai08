// chatListオブジェクトは、チャットボットが投稿するメッセージや挙動を定義した連想配列です。
const chatList = {
    // text: メッセージの内容を示す文字列または配列です。特定の条件下で変数や関数の結果も格納できます。
    // continue: チャットボットが自動的に次のメッセージを投稿するかどうかを示すブール値です。
    // option: メッセージの種類を示す文字列です。通常のテキストメッセージか、選択肢を含むメッセージかなどを指定します。
    1: { text: 'お困りですか？', continue: true, option: 'normal' },
    // questionNextSupport: 次の質問に対する詳細を投稿するかどうかを示すブール値です。特定の質問に対して詳細情報が必要な場合に使用されます。
    2: { text: { title: 'Q1', question: 'ご希望を選択してください', choices: ['案件を見てみたい', 'キャリア相談に乗ってほしい', 'エンジニアを探している', 'その他'] }, continue: false, option: 'choices', questionNextSupport: true }, // questionNextSupportは次に質問に対する詳細を投稿するかどうか
    // link: メッセージがリンクを含むかどうかを示すブール値です。
    3: { text: ['https://XXXXXXXXXXｘ', 'https://XXXXXXXXX', 'https://XXXXXXXXXXXX', 'https://www.XXXXXXXXXXXXｘ'], continue: true, option: 'normal', link: true },
    4: { text: 'こちらの文字をクリックしてください。', continue: true, option: 'normal' },
    5: { text: '解決しましたか？', continue: false, option: 'normal' },
    6: { text: '', continue: true, option: 'normal' },
  };
  
  // textSpecial()関数は、特定の条件下でメッセージを変更するためのものです。
  // この関数は、chatListオブジェクトのキーが6に対応するオブジェクトのtextプロパティに、特定のテキストを代入します。
  // この場合、キーが6に対応するオブジェクトのtextプロパティには、特定のメッセージが格納されることになります。そのメッセージは、「承知いたしました。続いてサポートを希望する方は090-XXXX-XXXXにお電話してください。担当者が直接対応します」という内容です。
  function textSpecial() {
    chatList[6].text = `承知いたしました。続いてサポートを希望する方は090-XXXX-XXXXにお電話してください。担当者が直接対応します`;
  }
  
  
  // ユーザーの発言や回答の数をカウントするための変数です。
  // 実際には必要ないが、管理しやすくするために導入されています。
  let userCount = 0;
  
  
  // ユーザーの発言や回答内容を記憶するための配列です。
  // チャットボットとユーザーの対話の中で、ユーザーの入力内容を記録するために使用されます。
  let userData = [];
  
  
  // チャットボットの画面を一番下にスクロールするための関数です。
  // チャットボットが新しいメッセージを表示した際に、常に最新のメッセージが表示されるようにします。
  function chatToBottom() {
    const chatField = document.getElementById('chatbot-body');
    chatField.scroll(0, chatField.scrollHeight - chatField.clientHeight);
  }
  
  // ユーザーがテキストを入力するためのテキストボックスを表すHTML要素です。
  // ユーザーがチャットボットにメッセージを送信する際に使用されます。
  const userText = document.getElementById('chatbot-text');
  
  // ユーザーがメッセージを送信するためのボタンを表すHTML要素です。
  // ユーザーがメッセージを入力し、送信ボタンをクリックすることで、チャットボットにメッセージが送信されます。
  const chatSubmitBtn = document.getElementById('chatbot-submit');
  
  // ロボットが投稿をする度にカウントしていくための変数です。
  // チャットボットが自動的に次のメッセージを投稿する際に、どのメッセージを投稿するかを管理するのに使用されます。
  let robotCount = 0;
  
  // 選択肢の正解の数をカウントするための変数です。
  // ユーザーが選択肢を選択し、正解かどうかを判定する際に使用されます。
  let qPoint = 0;
  
  // 選択肢ボタンを押した後の次の選択肢のオプションを表す変数です。
  // ユーザーが選択した選択肢に基づいて、次に表示されるメッセージが決定されるのに使用されます。
  let nextTextOption = '';
  
  
  // ユーザーが選択肢ボタンをクリックしたときに呼び出される関数です。
  // 引数 e は、ボタンがクリックされたときのイベントです。
  function pushChoice(e) {
    // userCountのインクリメント:
    // ユーザーの発言や回答の数をカウントするために、userCount変数がインクリメントされます。
    userCount++;
  
  
    console.log(`userCount: ${userCount}`);
  
    // getAttribute('id') を使用して、選択された選択肢のIDを取得します。
    // 選択肢のIDは、choicedId変数に格納されます。
    const choicedId = e.getAttribute('id');
  
  
    // 選択肢ボタンに表示されているテキスト内容を取得し、userData配列に保存します。
    userData.push(document.getElementById(choicedId).textContent);
  
    // chatList[robotCount].text.answerが存在する場合、選択肢に正解と不正解があることを意味します。
    if (chatList[robotCount].text.answer) {
  
      // 選択肢の正解のIDは、q-${robotCount}-${chatList[robotCount].text.answer}であり、trueChoice変数に格納されます。
      const trueChoice = `q-${robotCount}-${chatList[robotCount].text.answer}`// 正解選択肢のid
      if (choicedId === trueChoice) {
  
  
        // 選択された選択肢のIDと正解のIDを比較し、正解かどうかを判定します。
        // 正解の場合は、nextTextOptionに'qTrue'が設定され、qPointがインクリメントされます。
        nextTextOption = 'qTrue';
        qPoint++;
      } else {
        // 不正解
        nextTextOption = 'qFalse';
      }
  
  
    } else {
  
      // chatList[robotCount].questionNextSupportが存在する場合、次の質問に対する詳細を投稿する必要があることを意味します。
      if (chatList[robotCount].questionNextSupport) {
  
        // nextTextOptionには、次の選択肢のオプションが設定されます。その際、robotCountの桁数によって適切な部分文字列が取得されます。
        if (String(robotCount).length === 1) {
          nextTextOption = choicedId.slice(4);
        } else if (String(robotCount).length === 2) {
          nextTextOption = choicedId.slice(5);
        } else if (String(robotCount).length === 3) {
          nextTextOption = choicedId.slice(6);
        }
      }
    }
  
    // 選択された選択肢ボタンは無効化され、choice-button-disabledクラスが追加されます。
    // 同時に、選択されたボタンのみが有効であることを示すため、他の選択肢ボタンの無効化も行われます。
    for (let i = 0; i < chatList[robotCount].text.choices.length; i++) {
      document.getElementById('q-' + robotCount + '-' + i).disabled = true;
      document.getElementById('q-' + robotCount + '-' + i).classList.add('choice-button-disabled');
      document.getElementById(choicedId).classList.remove('choice-button-disabled');
    }
  
  
    // ユーザーの選択に応じて、次のロボットの応答を生成するために、robotOutput()関数が呼び出されます。
    robotOutput();
  
    // 最後に、userData配列がコンソールにログ出力されます。
    console.log(userData);
  }
  
  // 拡大ボタン
  // チャットボットの拡大状態を管理するための変数です。
  // 初期値は 'none' に設定されています。
  let chatbotZoomState = 'none';
  
  // document.getElementById() を使用して、拡大機能に関連する要素を取得しています。
  // chatbotはチャットボット全体を表す要素です。
  const chatbot = document.getElementById('chatbot');
  // chatbotBodyはチャットボットの本文部分を表す要素です。
  const chatbotBody = document.getElementById('chatbot-body');
  // chatbotFooterはチャットボットのフッター部分を表す要素です。
  const chatbotFooter = document.getElementById('chatbot-footer');
  // chatbotZoomIconはチャットボットの拡大アイコンを表す要素です。
  const chatbotZoomIcon = document.getElementById('chatbot-zoom-icon');
  
  
  // --------------------ロボットの投稿--------------------
  //   //   robotOutput() 関数:ロボットがメッセージを投稿するための関数です。
  // メッセージが投稿されるときに呼び出されます。
  function robotOutput() {
  
    robotCount++;
    console.log('robotCount：' + robotCount);
    // 相手の返信を待機する間の処理:相手の返信が終わるまで、自分の投稿を制御するために chatSubmitBtn.disabled = true; を使用して送信ボタンを無効にします。
    chatSubmitBtn.disabled = true;
  
    // 投稿要素の作成:メッセージを表示するために、ul要素にli要素を追加し、左寄せのスタイルを適用します。
    // ulとliを作り、左寄せのスタイルを適用し投稿する
    const ul = document.getElementById('chatbot-ul');
    const li = document.createElement('li');
    li.classList.add('left');
    ul.appendChild(li);
  
    // 考え中アニメーション:
    // ロボットが応答を生成している間に、ユーザーに待機中であることを示すアニメーションが表示されます。
    // robotLoadingDiv 要素が作成され、適切なクラスが追加されます。
    const robotLoadingDiv = document.createElement('div');
  
    // setTimeout() を使用して、一定時間（ここでは 800 ミリ秒）後に考え中アニメーションが表示されるようにしています。
    setTimeout(() => {
      li.appendChild(robotLoadingDiv);
      robotLoadingDiv.classList.add('chatbot-left');
      robotLoadingDiv.innerHTML = '<div id= "robot-loading-field"><span id= "robot-loading-circle1" class="material-icons">circle</span> <span id= "robot-loading-circle2" class="material-icons">circle</span> <span id= "robot-loading-circle3" class="material-icons">circle</span>';
      console.log('考え中');
      // 考え中アニメーションここまで
  
      // 一番下までスクロール:
      // chatToBottom() 関数が呼び出され、チャットボットの画面を一番下までスクロールします。
  
      chatToBottom();
    }, 800);
  
  
  
  
  
    setTimeout(() => {
  
  
      // 考え中アニメーション削除:
      // robotLoadingDiv 要素（考え中のアニメーション）が削除されます。これにより、待機中のアニメーションが消えて、次の処理に移行します。
      robotLoadingDiv.remove();
  
  
  
      // 選択肢の表示:
      // chatList[robotCount].option が 'choices' の場合、選択肢が表示されます。
      // choiceField 要素が作成され、適切なクラスが追加されます。
      if (chatList[robotCount].option === 'choices') {
        const qAnswer = `q-${robotCount}-${chatList[robotCount].text.answer}`;
        const choiceField = document.createElement('div');
        choiceField.id = `q-${robotCount}`;
        choiceField.classList.add('chatbot-left-rounded');
        li.appendChild(choiceField);
  
        // 質問タイトル
        // 質問タイトルと質問文が作成され、それぞれの内容が表示されます。
        const choiceTitle = document.createElement('div');
        choiceTitle.classList.add('choice-title');
        choiceTitle.textContent = chatList[robotCount].text.title;
        choiceField.appendChild(choiceTitle);
        // 質問文
        const choiceQ = document.createElement('div');
        choiceQ.textContent = chatList[robotCount].text.question;
        choiceQ.classList.add('choice-q');
        choiceField.appendChild(choiceQ);
  
        // 選択肢作成
        // 選択肢がボタンとして作成され、それぞれのテキストが表示されます。
        // 各選択肢のボタンには、クリックした際に pushChoice() 関数が呼び出されるようにイベントが設定されます。
        for (let i = 0; i < chatList[robotCount].text.choices.length; i++) {
          const choiceButton = document.createElement('button');
          choiceButton.id = `${choiceField.id}-${i}`; // id設定
          choiceButton.setAttribute('onclick', 'pushChoice(this)'); // ボタンを押した際の合図
          choiceButton.classList.add('choice-button');
          choiceField.appendChild(choiceButton);
          choiceButton.textContent = chatList[robotCount].text.choices[i];
        }
  
      } else {
        // このdivにテキストを指定
        const div = document.createElement('div');
        li.appendChild(div);
        div.classList.add('chatbot-left');
  
        // テキストを加工する場合（次の回答が選択型でも使えるようにここに設置）
        textSpecial();
  
        switch (chatList[robotCount].option) {
          case 'normal':
            if (chatList[robotCount].text.qTrue) {
              // 複数のテキストのうち特定のものを設定するとき
              if (chatList[robotCount].link) {
                div.innerHTML = `<a href= "${chatList[robotCount].text[nextTextOption]}" onclick= "chatbotLinkClick()">${chatList[robotCount].text[nextTextOption]}</a>`;
              } else {
                div.textContent = chatList[robotCount].text[nextTextOption];
              }
            } else if (robotCount > 1 && chatList[robotCount - 1].questionNextSupport) {
              console.log('次の回答の選択肢は' + nextTextOption);
              // 答えのない質問（次にサポートあり）
              if (chatList[robotCount].link) {
                div.innerHTML = `<a href= "${String(chatList[robotCount].text[nextTextOption])}" onclick= "chatbotLinkClick()">${String(chatList[robotCount].text[nextTextOption])}</a>`;
              } else {
                div.textContent = String(chatList[robotCount].text[nextTextOption]);
              }
            } else {
              // 通常
              if (chatList[robotCount].link) {
                div.innerHTML = `<a href= "${chatList[robotCount].text}" onclick= "chatbotLinkClick()">${chatList[robotCount].text}</a>`;
              } else {
                div.textContent = chatList[robotCount].text;
              }
            }
            break;
  
          case 'random':
            if (chatList[robotCount].link) {
              div.innerHTML = `<a href= "${chatList[robotCount].text[Math.floor(Math.random() * chatList[robotCount].text.length)]}" onclick= "chatbotLinkClick()">${chatList[robotCount].text[Math.floor(Math.random() * chatList[robotCount].text.length)]}</a>`;
            } else {
              div.textContent = chatList[robotCount].text[Math.floor(Math.random() * chatList[robotCount].text.length)];
            }
  
            break;
        }
        chatSubmitBtn.disabled = false;
      }
  
      // 一番下までスクロール
      chatToBottom();
  
      // 連続投稿
      if (chatList[robotCount].continue) {
        robotOutput();
      }
    }, 2000);
  
    if (chatbotZoomState === 'large' && window.matchMedia('(min-width:700px)').matches) {
      document.querySelectorAll('.chatbot-left').forEach((cl) => {
        cl.style.maxWidth = '52vw';
      });
      document.querySelectorAll('.chatbot-right').forEach((cr) => {
        cr.style.maxWidth = '52vw';
      });
      document.querySelectorAll('.chatbot-left-rounded').forEach((cr) => {
        cr.style.maxWidth = '52vw';
      });
    }
  }
  
  // 最初にロボットから話しかける
  robotOutput();
  
  
  // --------------------自分の投稿（送信ボタンを押した時の処理）--------------------
  chatSubmitBtn.addEventListener('click', () => {
  
    // 空行の場合送信不可
    if (!userText.value || !userText.value.match(/\S/g)) return false;
  
    userCount++;
  
    console.log(`userCount: ${userCount}`);
  
    // 投稿内容を後に活用するために、配列に保存しておく
    userData.push(userText.value);
    console.log(userData);
  
    // ulとliを作り、右寄せのスタイルを適用し投稿する
    const ul = document.getElementById('chatbot-ul');
    const li = document.createElement('li');
    // このdivにテキストを指定
    const div = document.createElement('div');
  
    li.classList.add('right');
    ul.appendChild(li);
    li.appendChild(div);
    div.classList.add('chatbot-right');
    div.textContent = userText.value;
  
    if (robotCount < Object.keys(chatList).length) {
      robotOutput();
    } else {
      // repeatRobotOutput(userText.value);
      repeatRobotOutput();
    }
  
    // 一番下までスクロール
    chatToBottom();
  
    // テキスト入力欄を空白にする
    userText.value = '';
  });
  
  
  // 最後やまびこ
  function repeatRobotOutput() {
    robotCount++;
    console.log(robotCount);
  
    chatSubmitBtn.disabled = true;
  
    const ul = document.getElementById('chatbot-ul');
    const li = document.createElement('li');
    li.classList.add('left');
    ul.appendChild(li);
  
    // 考え中アニメーションここから
    const robotLoadingDiv = document.createElement('div');
  
    setTimeout(() => {
      li.appendChild(robotLoadingDiv);
      robotLoadingDiv.classList.add('chatbot-left');
      robotLoadingDiv.innerHTML = '<div id= "robot-loading-field"><span id= "robot-loading-circle1" class="material-icons">circle</span> <span id= "robot-loading-circle2" class="material-icons">circle</span> <span id= "robot-loading-circle3" class="material-icons">circle</span>';
      console.log('考え中');
      // 考え中アニメーションここまで
  
      // 一番下までスクロール
      chatToBottom();
    }, 800);
  
    setTimeout(() => {
  
      // 考え中アニメーション削除
      robotLoadingDiv.remove();
  
      // このdivにテキストを指定
      const div = document.createElement('div');
      li.appendChild(div);
      div.classList.add('chatbot-left');
  
      div.textContent = userData[userCount - 1];
  
      // 一番下までスクロール
      chatToBottom();
  
      chatSubmitBtn.disabled = false;
  
    }, 2000);
  
    if (chatbotZoomState === 'large') {
      document.querySelectorAll('.chatbot-left').forEach((cl) => {
        cl.style.maxWidth = '52vw';
      });
      document.querySelectorAll('.chatbot-right').forEach((cr) => {
        cr.style.maxWidth = '52vw';
      });
      document.querySelectorAll('.chatbot-left-rounded').forEach((cr) => {
        cr.style.maxWidth = '52vw';
      });
    }
  }
  
  
  // PC用の拡大縮小機能
  function chatbotZoomShape() {
    chatbotZoomState = 'large';
    console.log(chatbotZoomState);
  
    chatbot.classList.add('chatbot-zoom');
    chatbotBody.classList.add('chatbot-body-zoom');
    chatbotFooter.classList.add('chatbot-footer-zoom');
    // 縮小アイコンに変更
    chatbotZoomIcon.textContent = 'fullscreen_exit';
    chatbotZoomIcon.setAttribute('onclick', 'chatbotZoomOff()');
  
    if (window.matchMedia('(min-width:700px)').matches) {
      //PC処理
      document.querySelectorAll('.chatbot-left').forEach((cl) => {
        cl.style.maxWidth = '52vw';
      });
      document.querySelectorAll('.chatbot-right').forEach((cr) => {
        cr.style.maxWidth = '52vw';
      });
      document.querySelectorAll('.chatbot-left-rounded').forEach((cr) => {
        cr.style.maxWidth = '52vw';
      });
    }
  }
  function chatbotZoom() {
    // 拡大する
    chatbotZoomShape();
    window.location.href = '#chatbot';
    // フルスクリーン
    // document.body.requestFullscreen();
  }
  function chatbotZoomOffShape() {
    chatbotZoomState = 'middle';
    console.log(chatbotZoomState);
  
    chatbot.classList.remove('chatbot-zoom');
    chatbotBody.classList.remove('chatbot-body-zoom');
    chatbotFooter.classList.remove('chatbot-footer-zoom');
    // 拡大アイコンに変更
    chatbotZoomIcon.textContent = 'fullscreen';
    chatbotZoomIcon.setAttribute('onclick', 'chatbotZoom()');
  
    document.querySelectorAll('.chatbot-left').forEach((cl) => {
      cl.style.maxWidth = '70%';
    });
    document.querySelectorAll('.chatbot-right').forEach((cr) => {
      cr.style.maxWidth = '70%';
    });
    document.querySelectorAll('.chatbot-left-rounded').forEach((cr) => {
      cr.style.maxWidth = '70%';
    });
  }
  function chatbotZoomOff() {
    // 縮小する
    chatbotZoomOffShape();
    window.history.back();
    // フルスクリーン解除
    // document.exitFullscreen();
  }
  
  // チャットボット内のリンクが押されたとき
  function chatbotLinkClick() {
    chatbotZoomOffShape();
    // 折りたたむ
    document.getElementById('chatbot').classList.add('chatbot-none');
    document.getElementById('chatbot-back').classList.add('none');
    document.getElementById('chatbot-start-button-icon').textContent = 'question_answer';
  }
  
  