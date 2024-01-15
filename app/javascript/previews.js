document.addEventListener("turbo:load", function () {
  // 新規投稿・編集ページのフォームを取得
  const formImg = document.getElementById("form");

  // プレビューを表示するためのスペースを取得
  const previewList = document.getElementById("previews");

  // 新規投稿・編集ページのフォームがないならここで終了。「!」は論理否定演算子。
  if (!formImg) return null;
  console.log("preview.jsが読み込まれました");

  // input要素を取得
  const fileField = document.querySelector(
    'input[type="file"][name="message[image]"]'
  );
  // input要素で値の変化が起きた際に呼び出される関数
  fileField.addEventListener("change", function (e) {
    console.log("input要素で値の変化が起きました");
    console.log(e.target.files[0]);
    //発火したイベントハッシュから取得できる

    // 古いプレビューが存在する場合は削除
    const alreadyPreview = document.querySelector(".preview");
    if (alreadyPreview) {
      alreadyPreview.remove();
    }

    const file = e.target.files[0];
    const blob = window.URL.createObjectURL(file);
    //URLを作成→変数に代入

    // 画像を表示するためのdiv要素を生成
    const previewWrapper = document.createElement("div");
    previewWrapper.setAttribute("class", "preview");

    // 表示する画像を生成
    const previewImage = document.createElement("img");
    previewImage.setAttribute("class", "preview-image");
    previewImage.setAttribute("src", blob);

    // 生成したHTMLの要素をブラウザに表示させる
    previewWrapper.appendChild(previewImage);
    previewList.appendChild(previewWrapper);
  });


  formImg.addEventListener("submit", function () {
    // 送信後にプレビューを削除
    const previewToRemove = document.querySelector(".preview");
    if (previewToRemove) {
      previewToRemove.remove();
    }
  });
});