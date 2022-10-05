// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



export default async function getData(req, res) {
  const query = req.query;
  console.log(query.query_param);
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  let fRes = "",
    err = "";

  await fetch(
    `http://localhost:5000/getData?query_param=${query.query_param}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      fRes = JSON.parse(result);
    })
    .catch((error) => (err = error));

  // let pre = {
  //   google: [],
  //   twitter: [],
  //   cruchbase: [],
  // };

  // Object.keys(fRes).forEach(async (key) => {
  //   for (let i = 0; i < fRes[key].length; i++) {
      // const element = fRes[key][i];
      // const previewData = await link_preview_generator(element);
      // console.log(previewData);
      // pre[key].push(previewData);

      // await fetch(fRes[key][i])
      //   .then((res) => res.text()) // parse response's body as text
      //   .then((body) => parseTitle(body)) // extract < title > from body
      //   .then((title) => pre[key].push(title)) // log title
      //   .catch((err) =>{
      //     console.log(err);
      //   });
  //   }
  // });

  if (fRes != "") {
    // console.log(pre);

    res.status(200).json({ result: fRes});
  } else {
    res.status(400).json({ error: err });
  }
}
