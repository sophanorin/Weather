class NotFound404 extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="container mx-auto flex justify-center items-center min-h-[70vh]">
        <h1 class="text-5xl font-bold">404 No Data Found!</h1>
      </div>
        `;
  }
}

customElements.define("not-found-404", NotFound404);
