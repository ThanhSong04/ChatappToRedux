import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import { send, remove, update } from './chatSlice.js';

ChatFeatures.propTypes = {};

function ChatFeatures(props) {
  const messages = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [messageIndex, setMessageIndex] = useState('');
  const [message, setMessage] = useState('');
  const [messageCurrent, setMessageCurrent] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const messagesEnd = useRef();
  const inputRef = useRef();

  const handleSend = () => {
    if (!isEdit) {
      const action = send(message);
      dispatch(action);
      setMessage('');
      inputRef.current.focus();
      scrollToBottom();
    } else {
      const action = update({ messageCurrent: messageCurrent, index: messageIndex, content: message });
      dispatch(action);
      setIsEdit(false);
      setMessage('');
    }
  };
  const handleRemove = (id) => {
    const action = remove(id);
    dispatch(action);
  };
  const handleUpdate = (message, index) => {
    setIsEdit(true);
    inputRef.current.focus();
    setMessage(message.content);
    setMessageCurrent(message);
    setMessageIndex(index);
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };
  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      handleSend();
    }
  };
  return (
    <div className="wrapper_message">
      <div className="box-chat_message">
        {messages.map((message, index) => (
          <div key={index} className="message_item">
            <div className={`${message.sender == 'your-message' ? 'your-message' : 'other-people'}`}>
              {message.content}
              <div className="message_icon">
                <i className="message_icon_remove">
                  <FontAwesomeIcon onClick={() => handleRemove(message.id)} icon={faXmark} />
                </i>
                <i className="message_icon_update">
                  <FontAwesomeIcon onClick={() => handleUpdate(message, index)} icon={faPencil} />
                </i>
              </div>
            </div>
          </div>
        ))}
        <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd}></div>
      </div>
      <div className="send_box">
        <input
          className="input_message"
          type="text"
          placeholder="Nhập tin nhắn ..."
          ref={inputRef}
          value={message}
          onKeyDown={onEnterPress}
          onChange={handleChange}
        />
        <button onClick={handleSend}>{!isEdit ? 'Send' : 'Edit'}</button>
      </div>
    </div>
  );
}

export default ChatFeatures;
