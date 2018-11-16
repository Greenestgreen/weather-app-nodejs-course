console.log('Starting app');

setTimeout( () => {
  console.log('Inside of callback');
},2000);

setTimeout( () => {
  console.log('Second callback');
},0);

for (i=0;i< 10000;i++){

  for (e=0;e< 1000;e++){
    for (o=0;o< 100;o++){

    }

  }
}
console.log('Finishin app');
