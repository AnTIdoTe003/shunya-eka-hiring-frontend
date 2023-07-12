import {
  Box,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get("/api/v1/all-users");
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  const createUser = async () => {
    try {
      const { data } = await axios.post("/api/v1/create-user", formData);

      if (data.success === true) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (id) => {
    try {
      const { data } = await axios.put(`/api/v1/update-user/${id}`, formData);
      if (data.success === true) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/delete-user/${id}`);
      if (data.success === true) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box w={"100%"}>
      <Container w={"100%"} maxW={"1440px"} margin={"0 auto"}>
        <Box
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"1rem"}
          py={"1rem"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button onClick={onOpen}>Create Users</Button>
          <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay
              bg="none"
              backdropFilter="auto"
              backdropInvert="80%"
              backdropBlur="2px"
            />
            <ModalContent>
              <ModalHeader>Enter the details to Create User</ModalHeader>
              <ModalCloseButton />
              <ModalBody display={"flex"} flexDirection={"column"} gap={"1rem"}>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter the Name"
                />
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter the Email"
                />
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter the Phone"
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={createUser}>
                  Create
                </Button>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Text as={"b"} fontSize={"2xl"}>
            All Users
          </Text>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Assignment by ShunyEka</TableCaption>
              <Thead>
                <Tr>
                  <Th>User ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((ele) => {
                  return (
                    <Tr key={ele._id}>
                      <Td>{ele._id}</Td>
                      <Td>{ele.name}</Td>
                      <Td>{ele.email}</Td>
                      <Td>{ele.phone}</Td>
                      <Td>
                        <HStack>
                          <Button onClick={onEditOpen}>Edit</Button>
                          <Modal
                            isOpen={isEditOpen}
                            onClose={onEditClose}
                            isCentered={true}
                          >
                            <ModalOverlay
                              bg="none"
                              backdropFilter="auto"
                              backdropInvert="80%"
                              backdropBlur="2px"
                            />
                            <ModalContent>
                              <ModalHeader>
                                Enter the details to Edit User
                              </ModalHeader>
                              <ModalCloseButton />
                              <ModalBody
                                display={"flex"}
                                flexDirection={"column"}
                                gap={"1rem"}
                              >
                                <Input
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      name: e.target.value,
                                    })
                                  }
                                  placeholder="Enter the Name"
                                />
                                <Input
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      email: e.target.value,
                                    })
                                  }
                                  placeholder="Enter the Email"
                                />
                                <Input
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      phone: e.target.value,
                                    })
                                  }
                                  placeholder="Enter the Phone"
                                />
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={() => editUser(ele._id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={onEditClose}
                                >
                                  Close
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                          <Button
                            bgGradient={[
                              "linear(to-tr, teal.300, yellow.400)",
                              "linear(to-t, blue.200, teal.500)",
                              "linear(to-b, orange.100, purple.300)",
                            ]}
                            onClick={onDeleteOpen}
                          >
                            Delete
                          </Button>
                          <Modal
                            isOpen={isDeleteOpen}
                            onClose={onDeleteClose}
                            isCentered={true}
                          >
                            <ModalOverlay
                              bg="none"
                              backdropFilter="auto"
                              backdropInvert="80%"
                              backdropBlur="2px"
                            />
                            <ModalContent>
                              <ModalHeader>
                                Do you want to delete this user?
                              </ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <HStack>
                                  <Button onClick={(e) => deleteUser(ele._id)}>
                                    Yes
                                  </Button>
                                  <Button colorScheme="red" onClick={onDeleteClose}>No</Button>
                                </HStack>
                              </ModalBody>
                            </ModalContent>
                          </Modal>
                        </HStack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
