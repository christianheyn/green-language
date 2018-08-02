'use babel';

import GreenLanguageView from './green-language-view';
import { CompositeDisposable } from 'atom';

export default {

  greenLanguageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.greenLanguageView = new GreenLanguageView(state.greenLanguageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.greenLanguageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'green-language:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.greenLanguageView.destroy();
  },

  serialize() {
    return {
      greenLanguageViewState: this.greenLanguageView.serialize()
    };
  },

  toggle() {
    console.log('GreenLanguage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
