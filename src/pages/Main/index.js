import React, { useState } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

export default function Main() {
    const [loading, setLoading] = useState(false);
    const [repo, setRepo] = useState('');
    const [repositories, setRepositories] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const response = await api.get(`/repos/${repo}`);

        const data = {
            name: response.data.full_name,
        };

        setRepositories([...repositories, data]);
        setRepo('');
        setLoading(false);
    }

    return (
        <Container>
            <h1>
                <FaGithubAlt />
                Repositórios
            </h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adicionar repositório"
                    value={repo}
                    onChange={e => setRepo(e.target.value)}
                />
                <SubmitButton loading={loading}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="#FFF" size={14} />
                    )}
                </SubmitButton>
            </Form>
        </Container>
    );
}
