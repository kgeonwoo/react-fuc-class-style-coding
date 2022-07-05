import { Component } from 'react';
import './App.css';
// 컴퍼넌트 (클래스형태로만들어봄)



class Nav extends Component {

  state = {
    list: [
      {}
    ]
  }



  //기본내제기능, 오버라이딩 느낌으로 함수에 기능 넣어서 해당 동작 시점을 관찰하겠다
  componentDidMount() {
    fetch('list.json')
      // 익명함수형태 전구누르고 convert 가능(arrow함수로..)
      .then(function (result) {
        return result.json();
      })
      // .then((json)=>console.log(json).bind(this));
      .then(function (json) {
        console.log(json);
        this.setState({ list: json });         //값 대체
      }.bind(this))

    // json으로 받아온 데이터를 동적으로(사용) rendering을 하려면 
    // state에 정의해주어야한다
  }



  render() {

    let listTag = [];
    for (let i = 0; i < this.state.list.length; i++) {
      let li = this.state.list[i]
      listTag.push(<li key={li.id}>
        <a href={li.id} data-id={li.id} onClick={function(e){
          e.preventDefault();
          this.props.onClick(e.target.dataset.id);
           //data-id,  dataset을 통해 발생한 이벤트의 타겟...참조 
        }.bind(this)}>
        {li.title}
        </a></li>);
      console.log('key: ', li.id);
      console.log('li: ', li);
    }
    return (

      <nav>
        <ul>
          {/* HTML이나 이미지 json등의 파일들은 public폴더에 넣어 서비스한다. */}
          {/* 사용시 경로는 public을 절대 경로로잡고 사용한다 */}
          {/* <li><a href={this.state.list.id}>{this.state.list.title}</a></li> */}
          {/* <li><a href='2'>CSS</a></li> */}
          {/* <li><a href='3'>JavaScript</a></li> */}
          {listTag}
        </ul>
      </nav>


    )
  };
}


class Article extends Component {

  render() {


    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    )
  }
}



// 클래스형태로 변경함...
class App extends Component {


  state = {
    article: { title: 'Welcome', desc: 'Hello, React &amp; Ajax' }
  }

  render() {



    return (
      <>
        <div className="App">
          <h1>web</h1>
          <Nav onClick={function (id) {
            fetch(id + '.json')
            .then(function (result) {
              return result.json();   //json잘 받았다면...
            })
            .then(function (json) {
              this.setState({
                article: { title: json.title, desc: json.desc }
              })
            }.bind(this));
          }.bind(this)}>

          </Nav>
          <Article title={this.state.article.title} desc={this.state.article.desc}></Article>
        </div>

      </>
    )
  }
}

export default App;