import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default function Main() {
    const [loading, setLoading] = useState(false);
    const [repo, setRepo] = useState('');
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        const rep = localStorage.getItem('repositories');
        if (rep) {
            setRepositories(JSON.parse(rep));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('repositories', JSON.stringify(repositories));
    }, [repositories]);

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
            <List>
                {repositories.map(repository => (
                    <li key={repository.name}>
                        <span>{repository.name}</span>
                        <Link
                            to={`/repository/${encodeURIComponent(
                                repository.name
                            )}`}
                        >
                            Detalhes
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    );
}
