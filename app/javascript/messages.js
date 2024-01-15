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

      let user;
      let message;
      let imageURL;
      let HTML;

      if (!XHR.response.imageURL) {
      user = XHR.response.user
      message = XHR.response.message;
      HTML = `
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
          </div>
        </div>`;
      }else{
      user = XHR.response.user;
      message = XHR.response.message;
      imageURL = XHR.response.imageURL
      HTML = `
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
            <img class="message-image" src=${origin + imageURL}></img>
          </div>
        </div>`;
      }
const messages = document.querySelector(".messages");
messages.insertAdjacentHTML("afterbegin", HTML);
const messageContent = document.getElementById("message_content")
const messageImage = document.getElementById("message_image");
messageContent.value = null
messageImage.value = null
    }
})
}

window.addEventListener("turbo:load", post);
