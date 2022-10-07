class Api {
  constructor({ baseUrlExcel, baseUrlFile }) {
    this._baseUrlExcel = baseUrlExcel;
    this._baseUrlFile = baseUrlFile;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json'
    }
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  postExcelData(data) {
    return fetch(this._baseUrlExcel, {
      mode: 'no-cors',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._getResponse(res));
  }

  putExcelData(data) {
    return fetch('https://newripproj-default-rtdb.firebaseio.com/posts/-NDfoiYzVM6ld9106AC7.json', {
      // mode: 'no-cors',
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => this._getResponse(res));
  }

  // postFile(data) {
  //   return fetch(this._baseUrlFile, {
  //     mode: 'no-cors',
  //     method: 'POST',
  //     headers: this._headers,
  //     body: data
  //   })
  //     .then(res => this._getResponse(res));
  // }
}

const api = new Api({
  baseUrlExcel: 'https://newripproj-default-rtdb.firebaseio.com/posts.json',
  baseUrlFile: ''
});

export default api;