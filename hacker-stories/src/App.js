import React from 'react';

const Hello = (props) => {
  return (
    <div>
      <p>{props.name != null ? 'Hello ' + props.name + ',' : null} {props.age != null ? 'you are ' + props.age + ' years old' : null}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="">
      greeting app created by <a href="https://github.com/acmahaja">acmahaja</a>
    </div>
  )
}


const App = () => {
  // const now = new Date();
  // const a = 10;
  // const b = 20;

  // return (
  //   <div>
  //     <p>Hello world, it is {now.toString()}</p>
  //     <p>
  //       {a} plus {b} is {a + b}
  //     </p>
  //   </div>
  // );

  // return React.createElement(
  //   'div',
  //   null,
  //   React.createElement('p', null, 'Hello World, it is', now.toString()),
  //   React.createElement('p', null, a, ' plus ', b, ' is ', a + b),
  // )

  // return (
  //   <div className="">
  //     <h1>Greetings</h1>
  //     <Hello />
  //     <Hello name="George" />
  //     <Hello name="Daisy" />
  //   </div>
  // )

  const name = 'Peter'
  const age = 10

  return (
    <div className="App">
      <h1>Greetings</h1>
      <Hello />
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </div>
  )

}

export default App;
