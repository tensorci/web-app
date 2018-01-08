import React from 'react';
import Dropdown from './Dropdown';

class UpdatesDropdown extends Dropdown {

  constructor(props) {
    super(props);

    this.items = [
      {
        'heading': 'Announcements',
        'desc': 'Important announcements from TensorCI about upcoming features and updates.',
        'href': '#',
      }
    ];
  }
}

export default UpdatesDropdown;