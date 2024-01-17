function post() {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    const getUrl = new URL(document.location)
    const origin = getUrl.origin
    const roomId = getUrl.pathname.split("/")[2]
    const postUrl = `/rooms/${roomId}/messages`
    XHR.open("POST", postUrl, true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }

      const user = XHR.response.user;
      const message = XHR.response.message;
      const imageURL = XHR.response.imageURL;
      const imageHTML = `<img class="message-image" src=${
        origin + imageURL
      }></img>`;

      const HTML = `
        <div class="message">
          <div class="upper-message">
            <div class="message-user">
              <!-- 投稿したユーザー名情報を出力する -->
              ${user.name}
            </div>
            <div class="message-date">
              <!-- 投稿した時刻を出力する -->
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <div class="message-content">
              <!-- 投稿したメッセージ内容を記述する -->
              ${message.content}
            </div>
            ${imageURL ? imageHTML : ""}
          </div>
          <div id="delete-button">
            <a data-turbo-method="delete" href="${postUrl}/${message.id}">削除</a>
          </div>
        </div>`;

      const messages = document.querySelector(".messages");
      messages.insertAdjacentHTML("afterbegin", HTML);
      const messageContent = document.getElementById("message_content");
      const messageImage = document.getElementById("message_image");
      messageContent.value = null;
      messageImage.value = null;

    }
})
}

window.addEventListener("turbo:load", post);
