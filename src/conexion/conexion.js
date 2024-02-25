const fetchData = async (method, data = null, id = null) => {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let url = 'http://localhost:3000/api/developers';
        if (id && (method === 'PUT' || method === 'DELETE')) {
            url += `/${id}`;
        }

        if (data && method !== 'DELETE') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        console.log('response:', response);
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default fetchData;
