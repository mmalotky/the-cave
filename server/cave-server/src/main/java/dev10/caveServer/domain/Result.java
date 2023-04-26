package dev10.caveServer.domain;

import java.util.ArrayList;
import java.util.List;

public class Result<T> {
    private ArrayList<String> messages = new ArrayList<>();
    private T payload;

    public T getPayload() {
        return payload;
    }

    public List<String> getMessages() {
        return new ArrayList<>(messages);
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public void addMessage(String message) {
        messages.add(message);
    }

    public boolean isSuccess() {
        return messages.size() == 0;
    }
}

