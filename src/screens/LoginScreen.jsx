import { Box, Button, Center, FormControl, Input, VStack, Text, useToast } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api"; // ajuste o caminho se necessário
import { useAuth } from "../contexts/AuthContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginSchema = z.object({
    email: z.string().email("E-mail inválido").nonempty("Campo obrigatório"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default function LoginScreen() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await api.post("/login", {
                email: data.email,
                password: data.password,
            });

            const token = response.data.token;
            await AsyncStorage.setItem("auth_token", token);
            signIn(response.data.user);
            toast.show({
                title: "Login realizado!",
                bg: "green.500",
            });

            // Aqui você pode redirecionar para a tela principal
        } catch (error) {
            console.error(error);

            toast.show({
                title: "Erro ao fazer login",
                description: error.response?.data?.message || "Verifique suas credenciais.",
                bg: "red.500",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Center flex={1} bg="coolGray.100" px={4}>
            <Box w="100%" maxW="300">
                <Text fontSize="2xl" mb={4} textAlign="center">
                    Login
                </Text>

                <VStack space={4}>
                    <FormControl isInvalid={!!errors.email}>
                        <FormControl.Label>E-mail</FormControl.Label>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    placeholder="Digite seu e-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <FormControl.ErrorMessage>
                            {errors.email?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.password}>
                        <FormControl.Label>Senha</FormControl.Label>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    placeholder="Digite sua senha"
                                    type="password"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        <FormControl.ErrorMessage>
                            {errors.password?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <Button onPress={handleSubmit(onSubmit)} mt={2} isLoading={loading}>
                        Entrar
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
}
