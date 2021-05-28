// Init Dragula
if (dragula) {
  const drg = dragula(Array.from(document.querySelectorAll('.js-drag-container')))
  drg.on('drop', (el, target, source, sibling) => {
    if (target.classList.contains('stage')) {
      const color = el.getAttribute('color')
      target.style.setProperty('--bg-color', color)
      
      if (sibling && sibling.tagName.toLowerCase() === 'book-element') {
        source.appendChild(sibling)
      }
    }
  })
}

// Custom Element Definition
class BookElement extends HTMLElement {
  constructor() {
    super()
    this.template = document.getElementById('book-template')
    
    if (this.template) {
      this.attachShadow({ mode: "open" }).appendChild(this.template.content.cloneNode(true))
    }
  }
  
  static get observedAttributes() {
    return ['color'];
  }
  
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attrName] = this.getAttribute(attrName);
      this.update();
    }
  }
  
  connectedCallback() {
    this.update();
  }
  
  update() {
    if (this.color) {
      this.style.setProperty('--cover-color', this.color)
    }
  }
}

if ('customElements' in window) {
    customElements.define('book-element', BookElement)
}
