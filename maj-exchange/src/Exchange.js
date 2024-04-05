// Exchange.js
import React, { useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import contractABI from './contractABI.json';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, VStack, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter } from "@chakra-ui/react";
import MetaMaskButton from './MetaMaskButton';

const Exchange = () => {
    const [ethAmount, setEthAmount] = useState(1);
    const [majAmount, setMajAmount] = useState('');
    const tokenContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const [showModal, setShowModal] = useState(false);
    const [showLegalModal, setShowLegalModal] = useState(false);

    const provider = useMemo(() => new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`), []);
    const tokenContract = useMemo(() => new ethers.Contract(tokenContractAddress, contractABI, provider), [provider, tokenContractAddress]);

    const toast = useToast();

    useEffect(() => {
        const getConversionRate = async () => {
            try {
                const unitsOneEthCanBuy = await tokenContract.unitsOneEthCanBuy();
                const majEquivalent = Number(ethAmount) * Number(unitsOneEthCanBuy.toString());
                setMajAmount(majEquivalent.toString());
            } catch (error) {
                toast({
                    title: "Error fetching conversion rate.",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        };

        getConversionRate();
    }, [ethAmount, tokenContract, toast]);

    const handleTrade = async (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirmTrade = async () => {
        setShowModal(false);
        setShowLegalModal(true);
    };    

    const handleCancelTrade = () => {
        setShowModal(false);
    };

    return (
        <VStack spacing={5} align="stretch">
            <Heading as="h2" size="lg">MajesticCoin Exchange</Heading>
            <FormControl id="ethAmount">
                <FormLabel>Ethereum Amount</FormLabel>
                <Input type="number" value={ethAmount} onChange={(e) => setEthAmount(e.target.value)} />
            </FormControl>
            <FormControl id="majAmount">
                <FormLabel>MAJ Amount</FormLabel>
                <Input type="number" value={majAmount} onChange={(e) => setMajAmount(e.target.value)} />
            </FormControl>
            <Button colorScheme="blue" onClick={handleTrade}>Submit Trade</Button>
            <MetaMaskButton />
            <Modal isOpen={showModal} onClose={handleCancelTrade}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Trade</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Trade Amount: {ethAmount} ETH</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleConfirmTrade}>
                            Confirm
                        </Button>
                        <Button variant="ghost" onClick={handleCancelTrade}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={showLegalModal} onClose={() => setShowLegalModal(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Legal Notice</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Currently looking at the legal implications of enabling trading. Check back soon...</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={() => setShowLegalModal(false)}>
                            Ok
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
};

export default Exchange;