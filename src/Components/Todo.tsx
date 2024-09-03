import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([""]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, ""]);
  };

  const handleRemoveTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);

    const userId = "yourUserId"; // 여기서 userId 값을 설정하세요
    try {
      await axios.post(`http://localhost:8000/api/v1/todo`, {
        userId: userId,
        tasks: tasks.filter(task => task.trim() !== ""), // 빈 항목은 제외
      });
      console.log("Todo 전송 성공");
    } catch (error) {
      console.error("Todo 전송 실패", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Title>
        오늘도 힘차게 시작해볼까요? 💪 
        <Subtitle>하루다짐을 작성하고 24시간 이내에 회고를 작성하면 그림을 그려드려요!</Subtitle>
      </Title>
      <Form onSubmit={handleSubmit}>
        <Label>하루다짐 작성</Label>
        {tasks.map((task, index) => (
          <TaskContainer key={index}>
            <TextArea
              value={task}
              onChange={(e) => handleTaskChange(index, e.target.value)}
              placeholder={`${index + 1}. 오늘의 계획과 다짐을 적어주세요 ✨`}
            />
            <RemoveWrap>
              <div></div>
              {index > 0 && (
                <RemoveButton type="button" onClick={() => handleRemoveTask(index)}>
                  삭제
                </RemoveButton>
              )}
            </RemoveWrap>
          </TaskContainer>
        ))}
        <AddButton type="button" onClick={handleAddTask}>
          + 추가
        </AddButton>
        <SubmitButton type="submit">제출하기</SubmitButton>
      </Form>

      {/* 모달 */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>제출이 완료되었습니다!</p>
            <p>24시간 내에 회고를 작성해주세요 🤗</p>
            <CloseButtonContainer>
              <div></div>
              <CloseButton onClick={handleCloseModal}>
                닫기
              </CloseButton>
            </CloseButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
`;

const TaskContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const RemoveWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RemoveButton = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 20px;
  background-color: #ff6b6b;
  color: white;
  cursor: pointer;
  width: 70px;
  margin-top: 10px;

  &:hover {
    background-color: #ff4d4d;
  }
`;

const AddButton = styled.button`
  align-self: flex-start;
  margin-bottom: 20px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    border: 1px solid white;
    background-color: black;
    color: white;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  background-color: #ffe14f;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

// 모달 
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 20px;
  background-color: #ffe14f;
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;

  &:hover {
    transform: scale(1.05);
  }
`;

export default Todo;
