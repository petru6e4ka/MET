import "./assets/scss/index.scss";

function toggleClass(className: string, event: Event) {
  const element = event.currentTarget as HTMLElement;

  if (element.classList.contains(className)) {
    element.classList.remove(className);
    return;
  }

  element.classList.add(className);
}

enum MenuIDs {
  open = "open-menu",
  close = "close-menu",
  menu = "menu",
}

enum MenuClasses {
  removeBodyScroll = "no-scroll",
  hideMenu = "hidden",
  openMenuBlock = "open",
}

interface IMenu {
  openButton: HTMLElement;
  closeButton: HTMLElement;
  blockToShow: HTMLElement;
}

class Menu implements IMenu {
  constructor(
    public openButton: HTMLElement,
    public closeButton: HTMLElement,
    public blockToShow: HTMLElement,
  ) {
    this.addToggleIcon(openButton);
    document.body.addEventListener("click", this.toggleMenu.bind(this));
    this.addOnMenuLinkClick();
  }

  private addToggleIcon(element: HTMLElement) {
    element.addEventListener("click", toggleClass.bind(null, MenuClasses.openMenuBlock));
  }

  private toggleMenu(event: Event) {
    const clicked = event.target as HTMLElement;
    const button: HTMLElement = clicked.id ? clicked : (clicked.parentNode as HTMLElement);

    if (button.id === MenuIDs.open) {
      this.blockToShow.classList.remove(MenuClasses.hideMenu);
      document.body.classList.add(MenuClasses.removeBodyScroll);

      setTimeout(() => {
        this.openButton.classList.remove(MenuClasses.openMenuBlock);
      }, 500);
    }

    if (button.id === MenuIDs.close) {
      this.blockToShow.classList.add(MenuClasses.hideMenu);
      document.body.classList.remove(MenuClasses.removeBodyScroll);
    }
  }

  private addOnMenuLinkClick() {
    if (this.blockToShow) {
      this.blockToShow.addEventListener("click", this.scrollTo.bind(this));
    }
  }

  private scrollTo(e: Event) {
    const element = e.target as HTMLAnchorElement;
    const href = element.href;

    if (href) {
      const id = href.split("#")[1];

      if (id) {
        this.blockToShow.classList.add(MenuClasses.hideMenu);
        document.body.classList.remove(MenuClasses.removeBodyScroll);
      }
    }
  }
}

const openMenuButton: HTMLButtonElement = document.querySelector(`#${MenuIDs.open}`);
const closeMenuButton: HTMLButtonElement = document.querySelector(`#${MenuIDs.close}`);
const menu: HTMLDivElement = document.querySelector(`#${MenuIDs.menu}`);

if (openMenuButton && closeMenuButton && menu) {
  new Menu(openMenuButton, closeMenuButton, menu);
}

const callAnimation = () => {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((icon) => {
      if (icon.isIntersecting) {
        icon.target.classList.add("trigger-call");
      } else {
        icon.target.classList.remove("trigger-call");
      }
    });
  });

  const icons = Array.from(window.document.querySelectorAll('[data-icon="phone"]'));

  if (icons.length > 0) {
    icons.forEach((icon) => observer.observe(icon));
  }
};

const heroAnimation = () => {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((block) => {
      if (block.isIntersecting) {
        block.target.classList.add("image-video");
      } else {
        block.target.classList.remove("image-video");
      }
    });
  });

  const hero = window.document.querySelector('[data-block="hero"]');

  if (hero) {
    observer.observe(hero);
  }
};

const intersectionHandler = (entry: IntersectionObserverEntry) => {
  const next = entry.target;

  if (next) {
    next.classList.add("section--active");
  }
};

const contentAnimation = () => {
  const sections = Array.from(document.querySelectorAll('[data-block="section"]'));

  const config = {
    rootMargin: "0px",
    threshold: 0.02,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        intersectionHandler(entry);
      }
    });
  }, config);

  if (sections.length) {
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
};

window.addEventListener("load", callAnimation);
window.addEventListener("load", heroAnimation);
window.addEventListener("load", contentAnimation);
