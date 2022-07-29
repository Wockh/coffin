import React from 'react';
import { RegEx } from '../constants';

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }

  generateJSON() {
    let form = document.getElementById('embed-builder');

    let result = ["{embed}"];

    let title = form.elements['title'].value;
    if (title) {
      result.push(`{title: ${title}}`)
    }

    let description = form.elements['description'].value;
    if (description) {
      result.push(`{description: ${description}}`)
    }

    let url = form.elements['url'].value;
    if (url && RegEx.URL.test(url)) {
      result.push(`{url: ${url}}`)
    }
    
    let author_url = form.elements['author:url'].value;
    let author_icon_url = form.elements['author:icon_url'].value;
    let author_name = form.elements['author:name'].value;
    
    if (author_name) {
      let author = `author: ${author_name}`
      
      if (author_icon_url && RegEx.imageURL.test(author_icon_url)) {
        author +=  ` && ${author_icon_url}`
      }

      if (author_icon_url && RegEx.URL.test(author_url)) {
        author += ` && ${author_url}`
      }

      result.push(`{${author}}`)
    }

    let fields = document.getElementById('fields').children;
    if (fields.length) {
      for (let i = 0; i < fields.length; i++) {
        let field_name = form.elements[`field-${i}:name`].value;
        let field_value = form.elements[`field-${i}:value`].value;
        let field_inline = form.elements[`field-${i}:inline`].checked;

        if (field_name && field_value) {
          let field = `field: ${field_name} && ${field_value}`

          if (field_inline) {
            field += " inline"
          }

          result.push(`{${field}}`)
        }
      }
    }

    let color = form.elements['color'].value;
    if (color) {
      color = `${parseInt(color, 10).toString(16).padStart(6, '0')}`

      if (color !== "#000000") {
        result.push(`{color: #${color}}`)
      }  
    }

    let thumbnail = form.elements['thumbnail:url'].value;
    if (thumbnail && RegEx.imageURL.test(thumbnail)) {
      result.push(`{thumbnail: ${thumbnail}}`)
    }

    let image = form.elements['image:url'].value;
    if (image && RegEx.imageURL.test(image)) {
      result.push(`{image: ${image}}`)
    }

    let timestamp = form.elements['timestamp'].checked;
    if (timestamp) {
      result.push("{timestamp}")
    }

    result = result.join("$v")

    document.getElementById('json-output').innerHTML = result

    let jsonOutput = document.getElementById('json-output').innerHTML;
    jsonOutput = jsonOutput.replace(/"([\w]*)":/g, '<span class="highlight key">"$1"</span>:');
    jsonOutput = jsonOutput.replace(/(\d*),/g, '<span class="highlight number">$1</span>,');
    jsonOutput = jsonOutput.replace(/: (true|false)/g, ': <span class="highlight boolean">$1</span>');
    jsonOutput = jsonOutput.replace(/: "(.*?)"/g, ': <span class="highlight string">"$1"</span>');
    document.getElementById('json-output').innerHTML = jsonOutput;
  }

  copyJSON() {
    let textarea = document.createElement('textarea')
  
    textarea.id = 'temp_element'
    textarea.style.height = 0

    document.body.appendChild(textarea)

    textarea.value = document.getElementById("json-output").innerText

    let selector = document.querySelector('#temp_element')

    selector.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  render() {
    return(
      <div className = "cell">
        <div id = "output-container">
          <div className = "controller">
            <button onClick = {() => this.generateJSON()}>
              <span role="img" aria-label="Gear Emoji">⚙</span>&ensp;Generate Embed Code
            </button>
            <button onClick = {() => this.copyJSON()}>
              <span role="img" aria-label="Copy Emoji">🔗</span>&ensp;Copy Embed Code
            </button>
          </div>
          <div className="output">
            <pre><div id="json-output" readOnly>{this.state.result}</div></pre>
          </div>
        </div>
      </div>
    );
  }
}

export default Output;
