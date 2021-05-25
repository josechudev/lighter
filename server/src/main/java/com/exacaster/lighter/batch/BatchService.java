package com.exacaster.lighter.batch;

import com.exacaster.lighter.storage.Storage;
import java.util.List;
import java.util.UUID;
import javax.inject.Singleton;

@Singleton
public class BatchService {

    private final Storage storage;

    public BatchService(Storage storage) {
        this.storage = storage;
    }

    public List<Batch> fetch(Integer from, Integer size) {
        return storage.findMany(from, size, Batch.class);
    }

    public Batch create(BatchConfiguration batch) {
        var entity = new Batch(UUID.randomUUID().toString(), null, "", BatchState.not_started, batch);
        return storage.storeEntity(entity);
    }

    public Batch update(Batch batch) {
        return storage.storeEntity(batch);
    }

    public List<Batch> fetchByState(BatchState state) {
        return storage.findManyByField("state", Batch.class, state);
    }

    public Batch fetchOne(String id) {
        return storage.findEntity(id, Batch.class)
                .orElse(null);
    }

    public void deleteOne(String id) {
        storage.deleteOne(id, Batch.class);
    }

}
