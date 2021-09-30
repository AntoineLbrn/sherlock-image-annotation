/** */
export default class SherlockAdapter {
  /** */
  constructor(canvasId, sparqlEndpointUrl, endpointUrl) {
    this.canvasId = canvasId;
    this.sparqlEndpointUrl = sparqlEndpointUrl;
    this.endpointUrl = endpointUrl;
  }

  /** */
  get annotationPageId() {
    return `${this.endpointUrl}/pages?uri=${this.canvasId}`;
  }

  /**
   * Devrait renvoyer une 403 car le body n'est pas bon.
   * */
  async create(annotation) {
    const token = await this.getToken();
    return fetch(this.endpointUrl + "/e13_and_triple_linked_resource", {
      body: JSON.stringify({
        annotation: {
          canvas: this.canvasId,
          data: JSON.stringify(annotation),
          uuid: annotation.id,
        },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token
      },
      method: 'POST',
    })
      .then((response) => this.all())
      .catch(() => this.all());
  }

  /** */
  async update(annotation) {
    return fetch(`${this.endpointUrl + "iiif-annotation"}/${encodeURIComponent(annotation.id)}`, {
      body: JSON.stringify({
        annotation: {
          data: JSON.stringify(annotation),
          uuid: annotation.id,
        },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
    })
      .then((response) => this.all())
      .catch(() => this.all());
  }

  /** */
  async delete(annoId) {
    return fetch(`${this.endpointUrl + "iiif-annotation"}/${encodeURIComponent(annoId)}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
      .then((response) => this.all())
      .catch(() => this.all());
  }

  /** */
  async get(annoId) {
    return (await fetch(`${this.sparqlEndpointUrl}/${encodeURIComponent(annoId)}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })).json();
  }

  async getToken() {
    return await fetch("http://localhost:5555/sherlock/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      cache: 'no-cache',
      body: JSON.stringify({username: "sherlock", password: "password"})}).then(response => response.json())
  }

  /** retourner toutes les annotations sous le format fakeAnnotation */
  async all() {
    return fakeAnnotation;
    return (await fetch(this.annotationPageId)).json();
  }
}

const fakeAnnotation = {
  "id": "https://purl.stanford.edu/sn904cj3429/iiif/canvas/sn904cj3429_1",
  "items": [
    {
      "body": {
        "type": "TextualBody",
        "value": "<p>mon annotation ciblée</p>"
      },
      "id": "93d1b891-efcb-43bb-b001-efc42bd21f82",
      "motivation": "commenting",
      "target": {
        "source": "https://purl.stanford.edu/sn904cj3429/iiif/canvas/sn904cj3429_1",
        "selector": [
          {
            "type": "FragmentSelector",
            "value": "xywh=5271,2300,2623,1917"
          },
          {
            "type": "SvgSelector",
            "value": "<svg xmlns='http://www.w3.org/2000/svg'><path xmlns=\"http://www.w3.org/2000/svg\" d=\"M5271.41765,4218.52085v-1917.88771h2623.77693v1917.88771z\" data-paper-data=\"{&quot;state&quot;:null}\" fill=\"none\" fill-rule=\"nonzero\" stroke=\"#00bfff\" stroke-width=\"3\" stroke-linecap=\"butt\" stroke-linejoin=\"miter\" stroke-miterlimit=\"10\" stroke-dasharray=\"\" stroke-dashoffset=\"0\" font-family=\"none\" font-weight=\"none\" font-size=\"none\" text-anchor=\"none\" style=\"mix-blend-mode: normal\"/></svg>"
          }
        ]
      },
      "type": "Annotation"
    },
    {
      "body": {
        "type": "TextualBody",
        "value": "<p>mon annotation libre</p>"
      },
      "id": "f355e23a-d0a6-40d6-b076-bd173c45aada",
      "motivation": "commenting",
      "target": "https://purl.stanford.edu/sn904cj3429/iiif/canvas/sn904cj3429_1",
      "type": "Annotation"
    }
  ],
  "type": "AnnotationPage"
}