class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todolist: [],
            text: '',
            id: 1,
        };
        this.handlerChange = this.handlerChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.clearAll = this.clearAll.bind(this);
    };

    handlerChange(e) {
        this.setState({ text: e.target.value });
    };

    addItem() {
        let newitem = {
            created: new Date(),
            text: this.state.text,
            id: this.state.id,
        };
        if (this.state.text) {
            this.setState((state) => ({
                text: '',
                id: state.id + 1,
                todolist: state.todolist.concat([newitem]),
            }),
            () => {localStorage.setItem('todoList', JSON.stringify(this.state.todolist));
                    localStorage.setItem('id', this.state.id);
            });
        };
    };

    deleteItem(id) {
        let itemList = this.state.todolist.filter((item) => item.id != id);
        this.setState({todolist: itemList},
        () => {localStorage.setItem('todoList', JSON.stringify(this.state.todolist));
            localStorage.setItem('id', this.state.id)
        });
    };

    clearAll() {
        this.setState({todolist: [], id: 1}, () => {localStorage.setItem('todoList', JSON.stringify(this.state.todolist));
            localStorage.setItem('id', this.state.id)
        })
    };

    componentDidMount() {
        let todoList = JSON.parse(localStorage.getItem('todoList'));
        let id = +localStorage.getItem('id');
        console.log(todoList);
        if (!todoList) {
            return;
        };
        this.setState({todolist: todoList, id: id});
    };

    render() {
        return (
            <div className="todoapp">
                <h1 className="title"><i className="far fa-list-alt"></i> To Do List</h1>
                <div className="add">
                    <input className="add_input" onChange={this.handlerChange} value={this.state.text} />
                    <button className="add_btn" onClick={this.addItem}><i className="far fa-plus-square"></i> Add New</button>
                    <button className="clear_btn" onClick={this.clearAll}><i className="far fa-trash-alt"></i> Clear All</button>
                </div>
                <div className="list">
                    {this.state.todolist.map((todo) =>
                    <Todo deleteItem={this.deleteItem} todo={todo} key={todo.id} />)}
                </div>
            </div>
        )
    };
};

class Todo extends React.Component {
    render() {
        let date = new Date(this.props.todo.created);
        return (
            <div className="list_item">
                <p className="list_item_text">{this.props.todo.text}</p>
                <div className="list_item_meta">
                    <span className="list_item_number"><i className="far fa-circle"></i> {this.props.todo.id}</span>
                    <span className="list_item_date"><i className="far fa-calendar"></i> {zero(date.getHours())}:{zero(date.getMinutes())}</span>
                    <button className="delete_btn" onClick={() => {this.props.deleteItem(this.props.todo.id)}}><i className="far fa-trash-alt"></i></button>
                </div>
            </div>
        )
    };
};

function zero(n) {
    if (n < 10) {
        return '0' + n;
    } else {
        return n;
    }
};

ReactDOM.render(
    <TodoApp />,
    document.querySelector('#root')
);
