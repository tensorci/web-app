import React from 'react';
import Dropdown from './Dropdown';

class SupportDropdown extends Dropdown {

  constructor(props) {
    super(props);

    this.items = [
      {
        'heading': 'Docs',
        'desc': 'Read about building, testing, and deploying your software on TensorCI.',
        'href': '#',
        'extLink': true
      },
      {
        'heading': 'Support',
        'desc': 'Send us a message. We are here to help!',
        'href': '#'
      },
      {
        'heading': 'Suggest a feature',
        'href': '#'
      },
      {
        'heading': 'Report an issue',
        'href': '#'
      }
    ];
  }
}

export default SupportDropdown;