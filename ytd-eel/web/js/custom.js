document.getElementById('hidden').style.display = 'none'

let path = ''
async function select() {
  path = await eel.selectFolder()()
  if (path === '') {
    document.getElementById('location').innerHTML = `
      <p>Please choose a download location.</p>
    `
  } else {
    document.getElementById('location').innerHTML = `
      <p>Download location: ${path}</p>
    `
  }
}

let data = ''
async function getinfo() {
  data = document.getElementById("url").value
  if (path === '') {
    document.getElementById("error").innerHTML = `<h2>Oops! You did not choose a download location!</h2>`
    setTimeout(() => {
      document.getElementById("error").innerHTML = ''
    }, 5000);
  } else {
    try {
      if (!data.includes('youtube.com')) {
        document.getElementById('hidden').style.display = 'none'
        document.getElementById("error").innerHTML = `<h2>Oops! You did not enter a youtube link!</h2>`
        setTimeout(() => {
          document.getElementById("error").innerHTML = ''
        }, 5000);
      } else {
        document.getElementById('get-info').textContent = 'Please Wait . . .'
        let values = await eel.getinfo(data)()
        if (!values) {
          document.getElementById('get-info').textContent = 'Get info'
          document.getElementById('hidden').style.display = 'none'
          document.getElementById("error").innerHTML = `<h2>Oops! You did not enter a valid link!</h2>`
          setTimeout(() => {
            document.getElementById("error").innerHTML = ''
          }, 5000);
        } else {
          document.getElementById('get-info').textContent = 'Get info'
          document.getElementById('hidden').style.display = 'block'
          document.getElementById('title').innerHTML = `
            <p>Title: <strong>${values[2]}</strong></p>
          `
          document.getElementById('author').innerHTML = `
            <p>Channel: <strong>${values[0]}</strong></p>
          `
          document.getElementById('duration').innerHTML = `
            <p>Duration: <strong>${values[1]} (hh:mm:ss)</strong></p>
          `
          document.getElementById('size720').innerHTML = `
            <p>720p HD Size: <strong>${Math.trunc((values[3]) / 1000000)} MB</strong></p>
          `
          document.getElementById('size360').innerHTML = `
            <p>360p SD Size: <strong>${Math.trunc((values[4]) / 1000000)} MB</strong></p>
          `
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
}

async function hqdownload() {
  document.getElementById('btn-hidden').style.display = 'none'
  document.getElementById('complete').textContent = 'Please Wait, Downloading . . .'
  let values = await eel.hqdownloader(data, path)()
  document.getElementById('btn-hidden').style.display = 'none'
  document.getElementById('complete').innerHTML = `
    <h2><em>Download Completed!</em></h2>
    <p>Download location: <strong>'${path}'</strong></p>
  `
}

async function lqdownload() {
  document.getElementById('btn-hidden').style.display = 'none'
  document.getElementById('complete').textContent = 'Please Wait, Downloading . . .'
  let values = await eel.lqdownloader(data, path)()
  document.getElementById('btn-hidden').style.display = 'none'
  document.getElementById('complete').innerHTML = `
    <h2><em>Download Completed!</em></h2>
    <p>Download location: <strong>'${path}'</strong></p>
  `
}